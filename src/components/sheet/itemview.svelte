<script lang="ts">
    import {Item} from "../classes/character";

    export let items: Array<Item>;

    function add_item() {
        items = [...items, new Item()];
    }

    function remove_item(i) {
        return () => { items.splice(i, 1); items = items; }
    }
</script>

<input type="button" on:click={add_item} value="add" class="btn">
<div class="attr-grid">
    <div></div> <b>item</b> <b>uses</b> <b>weight</b>
    {#each items as item, i}
        <input type="button" value="x" on:click={remove_item(i)} class="btn">
        <input type="text" bind:value={item.name}>
<!--        <input type="text" bind:value={item.description}>-->
        <input type="number" bind:value={item.uses}>
        <input type="number" bind:value={item.weight}>
    {/each}
</div>

<style>
    .attr-grid {
        display: grid;
        grid-template-columns: 1fr 6fr 2fr 2fr;
        width: 100%;
    }

    .btn {
        border: none;
        background: #ffffff00;
        color: blue;
    }

    input {
        min-width: 0px;
        margin: 5px 15px;
    }
</style>