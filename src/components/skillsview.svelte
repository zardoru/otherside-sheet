<script lang="ts">
    import {Skill} from "./classes/attribute";
    export let skills: Array<Skill>;

    // let filters =
</script>

<div class="attr-grid">
    <b>name</b> <b>upgraded</b> <b>current</b> <b>max</b>
    {#each skills as skill}
        <div class="fieldname"> <b>{skill.name}</b> </div>
        <input type="number" class="smaller" bind:value={skill.upgraded_value}>
        <div class="fieldname"> {skill.value} </div>
        <div class="cap fieldname"> {skill.cap} </div>
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        grid-column-gap: 10%;
    }

    .smaller {
        width: 50%;
    }

    .cap {
        color: #999999;
    }
</style>