<script lang="ts">
    import {Ability} from "../classes/character";
    import {skill_list} from "../classes/data/skills";
    import {createEventDispatcher} from "svelte";
    import {Skill} from "../classes/attribute";

    export let char_skills: Array<Skill>;
    export let abilities: Array<Ability>;

    const dispatch = createEventDispatcher();

    function remove_ability(i) {
        return () => { abilities.splice(i, 1); abilities = abilities; }
    }

    function rollAbility(abil: Ability) {
        let skill: Skill = null;
        for (let sk of char_skills) {
            if (sk.name == abil.skill) {
                skill = sk;
            }
        }

        return () => dispatch('roll', {
            skill_name: `${abil.name} (Skill: ${skill.name})`,
            roll_target: 50 + Math.floor(skill.value / 4),
            roll_value: 1 + Math.floor(Math.random() * 100)
        })
    }

    function add_ability() {
        abilities = [...abilities, new Ability()];
    }
</script>

<input type="button" on:click={add_ability} value="add" class="btn">
<div class="attr-grid">
    <b></b>
    <b>name</b>
    <b>cost</b>
    <b>skill</b>
    <b></b>
    {#if abilities.length > 0}
        {#each abilities as ability, i}
            <input type="button" value="x" on:click={remove_ability(i)} class="btn">
            <input type="text" bind:value={ability.name}>
            <input type="number" bind:value={ability.cost}>
            <select bind:value={ability.skill}>
                {#each skill_list as skill}
                    <option value={skill}>{skill}</option>
                {/each}
            </select>
            <input type="button" value="roll" on:click={rollAbility(ability)} class="btn">
        {/each}
    {:else}
        <div class="ability-remark">No abilities.</div>
    {/if}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 5% 55% 10% 20% 10%;
        width: 100%;
        padding: 5px;
        margin: 10px;
    }

    .ability-remark {
        grid-column-start: 1;
        grid-column-end: span 5;
        text-align: center;
        font-size: 20px;
        color: #666666;
        width: 100%;
        padding: 30px;
    }

    .btn {
        border: none;
        background: #ffffff00;
        color: blue;
    }
</style>