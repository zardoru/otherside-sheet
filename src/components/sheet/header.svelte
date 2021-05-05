<script lang="ts">
    import TextInput from '../input/textinput.svelte';
    import {race_list} from "../classes/data/races";

    export let char_data;
</script>

<div class="row">
    <TextInput class="it" fieldname="character name" bind:data={char_data.name}/>
    <TextInput fieldname="player" bind:data={char_data.player}/>
</div>

<div class="row">
    <div class="textin">
        <div class="fieldname textname"> <b>race</b> </div>
        <select bind:value={char_data.race}>
            {#each race_list as race}
                <option value={race.race_name}>{race.race_name}</option>
            {/each}
        </select>
    </div>

    <TextInput fieldname="subrace" bind:data={char_data.subrace}/>
</div>

<TextInput fieldname="save point" bind:data={char_data.save_point}/>

<div class="textin">
    <div class="fieldname textname"> <b> gold </b></div>
    <input type="number" bind:value={char_data.gold}>
</div>

<h2>appearance</h2>
<div class="row">
    <TextInput fieldname="weight" bind:data={char_data.weight}/>
    <TextInput fieldname="height" bind:data={char_data.height}/>
</div>

<div class="row">
    <TextInput fieldname="color" bind:data={char_data.color}/>
    <TextInput fieldname="hand" bind:data={char_data.hand}/>
</div>

