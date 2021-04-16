<script lang="ts">
    export let fieldname;
    export let data;
</script>

<div class="textin">
   <div class="fieldname textname"> <b>{fieldname}</b> </div> <input type="text" bind:value={data}>
</div>