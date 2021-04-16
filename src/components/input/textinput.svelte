<script lang="ts">
    export let fieldname;
    export let data;
</script>

<div class="textin">
   <div class="fieldname textname"> <b>{fieldname}</b> </div> <input type="text" bind:value={data}>
</div>

<style>
    .textin {
        display: grid;
        grid-template-columns: 1fr 4fr;
        width: 100%;
        margin: 0 10px;
    }

    .textname {
        min-width: 20%;
        padding-top: 15px;
    }
</style>