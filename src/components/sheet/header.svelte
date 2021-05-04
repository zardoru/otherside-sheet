<script lang="ts">
    import TextInput from '../input/textinput.svelte';
    import {race_list} from "../classes/data/races";

    export let char_data;
    let selected_race = race_list[0].race_name;

    function onRaceChange() {
        char_data.race = selected_race;
    }

    onRaceChange();
</script>

<div class="row">
    <TextInput class="it" fieldname="character name" bind:data={char_data.name}/>
    <TextInput fieldname="player" bind:data={char_data.player}/>
</div>

<div class="row">
    <div class="textin">
        <div class="fieldname textname"> <b>race</b> </div>
        <select bind:value={selected_race} on:blur={onRaceChange} on:change={onRaceChange}>
            {#each race_list as race}
                <option value={race.race_name}>{race.race_name}</option>
            {/each}
        </select>
    </div>

    <TextInput fieldname="subrace" bind:data={char_data.subrace}/>
</div>

<TextInput fieldname="save point" bind:data={char_data.save_point}/>

<TextInput fieldname="weight" bind:data={char_data.weight}/>

<div class="row">
    <div class="textin" style="flex-grow: 7">
        <div class="fieldname textname"> <b> class </b></div>
        <input type="text" bind:value={char_data.char_class}>
    </div>
    <div class="textin">
        <div class="fieldname textname"> <b> level </b></div>
        <input type="number" bind:value={char_data.class_level}>
    </div>
</div>

<div class="textin">
    <div class="fieldname textname"> <b> gold </b></div>
    <input type="number" bind:value={char_data.gold}>
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>