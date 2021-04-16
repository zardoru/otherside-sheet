<script lang="ts">
    import TextInput from './input/textinput.svelte';
    import {race_list} from "../races";

    export let char_data;
    let selected_race = race_list[0];

    function onRaceChange() {
        char_data.race = selected_race;
    }
</script>

<div class="row">
    <TextInput class="it" fieldname="character name" bind:data={char_data.name}/>
    <TextInput fieldname="player" bind:data={char_data.player}/>
</div>

<div class="row">
    <div class="textin">
        <div class="fieldname textname"> <b>race</b> </div>
        <select bind:value={selected_race} on:change={onRaceChange}>
            {#each race_list as race}
                <option value={race.race_name}>{race.race_name}</option>
            {/each}
        </select>
    </div>

    <TextInput fieldname="subrace" bind:data={char_data.subrace}/>
</div>

<TextInput fieldname="save point" bind:data={char_data.save_point}/>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>