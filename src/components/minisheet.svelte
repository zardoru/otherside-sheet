<script lang="ts">
    import CharHeader from './sheet/header.svelte';
    import AttrView from './sheet/attributesview.svelte';
    import SkillView from './sheet/skillsview.svelte';
    import ItemView from './sheet/itemview.svelte';
    import AbilitiesView from './sheet/abilitiesview'
    import {Character} from "./classes/character";

    export let char_data: Character;
    let page = "attributes"

    function rollSkill() {
        alert("not supported in GM mode.");
    }
</script>

<div class="col">
    <div class="title"><b>{char_data.name}</b> ({char_data.player})</div>
    <div class="row">
        <button on:click={() => page = 'character'}
                class:selected={page === 'character'}
                class="char-btn">
            character
        </button>
        <button on:click={() => page = 'attributes'}
                class:selected={page === 'attributes'}
                class="char-btn">
            attributes
        </button>
        <button on:click={() => page = 'skills'}
                class:selected={page === 'skills'}
                class="char-btn">
            skills
        </button>
        <button on:click={() => page = 'items'}
                class:selected={page === 'items'}
                class="char-btn">
            items
        </button>
        <button on:click={() => page = 'abilities'}
                class:selected={page === 'abilities'}
                class="char-btn">
            abilities
        </button>
    </div>
    <div class="row expand">
        {#if page === 'attributes'}
            <div class="col">
                <AttrView bind:attributes={char_data.attributes}/>
            </div>
        {:else if page === 'character'}
            <div class="col">
                <CharHeader bind:char_data={char_data}/>
            </div>
        {:else if page === 'skills'}
            <div class="col">
                <SkillView bind:skills={char_data.skills} on:roll={rollSkill}/>
            </div>
        {:else if page === 'items'}
            <div class="col">
                <ItemView bind:items={char_data.items}/>
            </div>
        {:else if page === 'abilities'}
            <div class="col">
                <AbilitiesView bind:skills={char_data.skills} bind:abilities={char_data.abilities} on:roll={rollSkill}/>
            </div>
        {/if}
    </div>
</div>

<style>
    .title {
        font-size: 16px;
        padding: 10px;
    }

    .title > b {
        font-size: 32px;
        padding-right: 10px;
    }

    .expand > * {
        width: 100%;
    }
</style>