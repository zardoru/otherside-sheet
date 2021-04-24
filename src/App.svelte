<script lang="ts">
    import CharHeader from './components/header.svelte';
    import AttrView from './components/attributesview.svelte';
    import SkillView from './components/skillsview.svelte';
    import ItemView from './components/itemview.svelte';
    import {Character} from './components/classes/character.ts';

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
    <div style="width: 90%">
        <h1>items</h1>
        <ItemView bind:items={char_data.items}/>
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
