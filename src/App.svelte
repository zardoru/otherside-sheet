<script lang="ts">
    import CharHeader from './components/header.svelte';
    import AttrView from './components/attributesview.svelte';
    import SkillView from './components/skillsview.svelte';
    import {Attribute, Skill} from "./components/classes/attribute";
    import {skill_list} from "./skills";
    import {attributes} from "./attributes";
    import {races} from "./races";

    let new_attr = () => Object.keys(attributes).map(key => new Attribute(attributes[key], key));
    let new_skills = () => skill_list.map(x => new Skill(x));

    class Character {
        name = 'character mcdiceface';
        _race = 'Human';
        subrace = '';
        save_point = 'none yet';
        player = 'a good one';
        attributes = new_attr();
        current_attributes = [];
        skills = new_skills();
        items = [];

        get race(): string {
            return this._race;
        }

        set race(value) {
            this._race = value;

            const cur_race = races[this._race];
            for (let skill of this.skills) {
                skill.racial_bonus = cur_race.skill_bonus[skill.name] || 0;
            }

            for (let attribute of this.attributes) {
                attribute.racial_bonus = cur_race.attribute_bonus[attribute.short_name] || 0;
            }
        }
    }

    let char_data = new Character();
</script>

<main>
    <div>
        <h1>character</h1>
        <CharHeader bind:char_data={char_data}/>
    </div>

    <div>
        <h1>attributes</h1>
        <AttrView bind:attributes={char_data.attributes}/>
    </div>
    <div>
        <h1>skills</h1>
        <SkillView bind:skills={char_data.skills}/>
    </div>
    <div>
        <h1>items</h1>
    </div>
</main>

<style>
    main {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 0.2fr;
        width: 100%;
        border: 4px solid;
        padding: 10px;
    }

    main > div {
        margin: 5px;
        padding: 10px;
        justify-self: left;
    }

</style>
