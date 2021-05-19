<script lang="ts">
    import {Skill} from "../classes/attribute";
    import {categorized_skill_list} from "../classes/data/skills";
    import {createEventDispatcher} from "svelte";

    const dispatch = createEventDispatcher();

    export let skills: Array<Skill>;

    let current_filter = 'stealth';

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
            roll_value: 1 + Math.floor(Math.random() * 100)
        })
    }

    function rollCombatOffhand(skill: Skill) {
        return () => dispatch('roll', {
            skill_name: skill.name,
            roll_target: 50 + Math.floor(skill.value / 4),
            roll_value: 1 + Math.floor(Math.random() * 100)
        })
    }

    function rollGeneric(skill: Skill) {
        return () => dispatch('roll', {
            skill_name: skill.name,
            roll_target: 50 + Math.floor(skill.value / 4),
            roll_value: 1 + Math.floor(Math.random() * 100)
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

<br>

<div class="attr-grid">
    <b>name</b> <b>upgraded</b> <b>current</b> <b>max</b> <b></b>
    {#each skills as skill}
        {#if skill.category === current_filter || current_filter == null}
            <div class="fieldname"> <b>{skill.name}</b> </div>
            <input type="number" class="smaller" bind:value={skill.upgraded_value}>
            <div class="fieldname"> {skill.value} </div>
            <div class="fieldname"
                 class:cap={skill.cap === 100}
                 class:positive_cap={skill.cap > 100}
                 class:negative_cap={skill.cap < 100}> {skill.cap} </div>
            {#if skill.category === "weapons"}
                <div class="row">
                <input type="button" on:click={rollCombat(skill)} value="roll" class="roll">
                    <input type="button" on:click={rollCombatOffhand(skill)} value="offhand" class="roll">
                </div>
            {:else}
                <input type="button" on:click={rollGeneric(skill)} value="roll" class="roll">
            {/if}

        {/if}
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 3fr 1fr 1fr 1fr 3fr;
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

    input[type=button].roll {
        border: none;
        color: blue;
        background-color: white;
        width: 100%;
    }

    .smaller {
        width: 50%;
    }

    .cap {
        color: #999999;
    }

    .positive_cap {
        color: #23991f;
    }

    .negative_cap {
        color: #991f21;
    }
</style>