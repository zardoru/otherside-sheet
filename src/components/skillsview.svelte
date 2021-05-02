<script lang="ts">
    import {Skill} from "./classes/attribute";
    import {categorized_skill_list} from "./classes/data/skills";

    export let skills: Array<Skill>;

    let current_filter;

    let categories = [];

    for (let key in categorized_skill_list) {
        categories.push(key);
    }

    function setFilter(filter) {
        return () => current_filter = filter;
    }
</script>

<div class="row">
    {#each categories as category}
        <input type="button" value="{category}" on:click={setFilter(category)}>
    {/each}
    <input type="button" value="no filter" on:click={setFilter(null)}>
</div>
<div class="attr-grid">
    <b>name</b> <b>upgraded</b> <b>current</b> <b>max</b>
    {#each skills as skill}
        {#if skill.category === current_filter || current_filter == null}
            <div class="fieldname"> <b>{skill.name}</b> </div>
            <input type="number" class="smaller" bind:value={skill.upgraded_value}>
            <div class="fieldname"> {skill.value} </div>
            <div class="cap fieldname"> {skill.cap} </div>
        {/if}
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr;
        grid-column-gap: 10%;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .smaller {
        width: 50%;
    }

    .cap {
        color: #999999;
    }
</style>