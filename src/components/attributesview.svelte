<script lang="ts">
    import {AttributeType} from "./classes/attribute.type";
    export let attributes: Array<AttributeType>;

    function getAttrDisplayName(attr: AttributeType) {
        if (attr.short_name !== null)
            return `${attr.name} (${attr.short_name})`
        else
            return attr.name;
    }
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