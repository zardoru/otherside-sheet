<script lang="ts">
    export let fieldname;
    export let data;
</script>

<div class="textin">
   <label> <b>{fieldname}</b> </label> <input type="text" bind:value={data}>
</div>

<style>
    .textin {
        display: flex;
        flex-direction: row;
        width: 90%;
        margin: 10px;
    }

    input[type=text] {
        flex-grow: 1;
    }

    label {
        min-width: 10%;
        padding-top: 10px;
    }
</style>