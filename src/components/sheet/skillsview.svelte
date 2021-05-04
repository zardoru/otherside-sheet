<script lang="ts">
    import {Skill} from "../classes/attribute";
    import {categorized_skill_list} from "../classes/data/skills";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let skills: Array<Skill>;

    let current_filter;

    let categories = [];

    for (let key in categorized_skill_list) {
        categories.push(key);
    }

    function setFilter(filter) {
        return () => current_filter = filter;
    }

    function rollCombat(skill: Skill) {
        return () => dispatch('roll', {
            skill_name: skill.name,
            roll_target: 60 + Math.floor(skill.value / 2),
            roll_value: 1 + Math.round(Math.random() * 99)
        })
    }

    // TODO
    function rollGeneric(skill: Skill) {
        return () => dispatch('roll', {
            skill_name: skill.name,
            roll_target: 50 + skill.value,
            roll_value: 1 + Math.round(Math.random() * 99)
        })
    }
</script>

<div class="row">
    {#each categories as category}
        <input type="button"
               value="{category}"
               on:click={setFilter(category)}
               class:active={current_filter === category}
               class="filter"
        >
    {/each}
    <input type="button"
           value="no filter"
           on:click={setFilter(null)}
           class="filter"
           class:active={current_filter == null}>
</div>
<div class="attr-grid">
    <b>name</b> <b>upgraded</b> <b>current</b> <b>max</b> <b></b>
    {#each skills as skill}
        {#if skill.category === current_filter || current_filter == null}
            <div class="fieldname"> <b>{skill.name}</b> </div>
            <input type="number" class="smaller" bind:value={skill.upgraded_value}>
            <div class="fieldname"> {skill.value} </div>
            <div class="cap fieldname"> {skill.cap} </div>
            {#if skill.category === "weapons"}
                <input type="button" on:click={rollCombat(skill)} value="roll">
            {:else}
                <input type="button" on:click={rollGeneric(skill)} value="roll">
            {/if}

        {/if}
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
        grid-column-gap: 10%;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    input[type=button].filter {
        border: none;
        background-color: white;
    }

    input[type=button].filter.active {
        background-color: #85fff7;
    }

    input[type=button].filter:hover {
        background-color: #b3fffa;
    }

    .smaller {
        width: 50%;
    }

    .cap {
        color: #999999;
    }
</style>