<script lang="ts">
    import {Attribute} from "../classes/attribute";
    const {current_attributes} = require("../classes/data/attributes");

    export let attributes: Array<Attribute>;
</script>

<div class="attr-grid">
    <b></b>
    <b></b>
    <b>upgrade</b>
    <b>current</b>
    <b>max</b>
    <b></b>
    <b></b>
    <b>upgrade</b>
    <b>current</b>
    <b>max</b>
    {#each attributes as attr}
        <div class="fieldname"> <b>{attr.name}</b> </div>
        <div class="fieldname shortname"> <b>{attr.short_name}</b> </div>


        {#if current_attributes.has(attr.short_name)}
            <input type="number"
                   class="smaller"
                   bind:value={attr.upgraded_value}
                   min=0>

            <input type="number"
                   class="smaller"
                   bind:value={attr.temporal_current_value}
                   max={attr.temporal_cap}
                   class:enhanced_attr={attr.isPositiveBonus}
                   class:worsened_attr={attr.isNegativeBonus}>

            <div class="attr"
                 class:enhanced_attr={attr.isPositiveBonus}
                 class:worsened_attr={attr.isNegativeBonus}>{attr.temporal_cap}</div>
        {:else}
            <input type="number"
                   class="smaller"
                   bind:value={attr.upgraded_value}
                   min=1>

            <div class="attr">{attr.value}</div>

            <div class="attr"
                 class:enhanced_attr={attr.isPositiveBonus}
                 class:worsened_attr={attr.isNegativeBonus}>{attr.cap}</div>
        {/if}



    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 15% 1fr 3fr 2fr 2fr 15% 1fr 3fr 2fr 2fr;
    }

    .attr-grid > b {
        text-align: center;
        margin: auto;
    }

    .attr-grid > input {
        margin: auto;
    }

    .attr {
        padding-top: 15px;
        text-align: center;
        margin: auto;
    }

    .smaller {
        width: 30%;
    }

    .shortname {
        color: #999999;
        text-align: center;
        margin: auto;
    }
</style>