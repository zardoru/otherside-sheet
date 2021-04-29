<script lang="ts">
    import CharHeader from './components/header.svelte';
    import AttrView from './components/attributesview.svelte';
    import SkillView from './components/skillsview.svelte';
    import ItemView from './components/itemview.svelte';
    import {Character} from './components/classes/character.ts';
    import {Backend} from "./components/backend";

    let char_data = new Character();
    let discord_url;

    async function save_character() {
        const j = char_data.as_json();
        const key = prompt("authorization key to save?");
        const status = await Backend.SaveCharacter(key, j);
        if (status != 200) {
            alert("sorry. couldn't save character. check your auth key");
        }
    }

    async function load_character() {
        const pn = prompt("player name to load?");
        const data = await Backend.LoadCharacter(pn);

        console.log(data);
        if (data == null)
            alert("couldn't load character data. probably doesn't exist.");
        else
            char_data = Character.from_json(data);
    }
</script>

<main>
    <div style="grid-column-start:1; grid-column-end: span 2">
        <input type="button" value="save" on:click={save_character}>
        <input type="button" value="load" on:click={load_character}>

        <input type="text" id="hook" bind:value={discord_url} placeholder="enter discord webhook url">
    </div>

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
