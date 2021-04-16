<script lang="ts">
    import CharHeader from './components/header.svelte';
    import AttrView from './components/attributesview.svelte';
    import SkillView from './components/skillsview.svelte';
    import {Attribute, Skill} from "./components/classes/attribute";
    import {skill_list} from "./skills";
    import {attributes} from "./attributes";

    let attr = Object.keys(attributes).map(key => new Attribute(attributes[key], key));
    console.log(attr);

    let sk = skill_list.map(x => new Skill(x));
    console.log(sk);

    let char_data = {
        'name': 'character mcdiceface',
        'race': 'nascar',
        'save point': 'none yet',
        'player': 'a good one',
        'attributes': attr,
        'current_attributes': [],
        'skills': sk,
        'items': []
    };
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
