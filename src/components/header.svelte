<script lang="ts">
    import TextInput from './input/textinput.svelte';

    export let char_data;
</script>

<div class="row">
    <TextInput class="it" fieldname="character name" bind:data={char_data.name}/>
    <TextInput class="it" fieldname="race" bind:data={char_data.race}/>
</div>

<div class="row">
    <TextInput fieldname="save point" bind:data={char_data['save point']}/>
    <TextInput fieldname="player" bind:data={char_data.player}/>
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
    }
</style>