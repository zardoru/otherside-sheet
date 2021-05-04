<script lang="ts">
    import {Attribute} from "../classes/attribute";

    export let attributes: Array<Attribute>;
</script>

<div class="attr-grid">
    {#each attributes as attr}
        <div class="fieldname"> <b>{attr.name}</b> </div>
        <div class="fieldname"> <b>({attr.short_name})</b> </div>
        <input type="number" class="smaller" bind:value={attr.value} min=1>
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
    }

    .smaller {
        width: 30%;
    }
</style>