<script lang="ts">
    import {SkillType} from "./classes/skill.type";
    export let skills: Array<SkillType>;
</script>

<div class="attr-grid">
    <b>name</b> <b>current</b> <b>max</b>
    {#each skills as skill}
        <div class="fieldname"> <b>{skill.name}</b> </div>
        <input type="number" class="smaller" bind:value={skill.value}>
        <div class="cap fieldname"> {skill.cap} </div>
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-column-gap: 10%;
    }

    .smaller {
        width: 30%;
    }

    .cap {
        color: #999999;
    }
</style>