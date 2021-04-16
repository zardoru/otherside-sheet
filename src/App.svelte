<script lang="ts">
    import CharHeader from './components/header.svelte';

    let char_data = {
        'name': 'character mcdiceface',
        'race': 'nascar',
        'save point': 'none yet',
        'player': 'a good one',
        'skills': [],
        'items': []
    };
</script>

<main>
    <div class="section"><CharHeader bind:char_data={char_data}/></div>
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
        width: 100%;
        height: 100%;
        border: 3px solid;
        padding: 10px;
	}

    .section {
        border: 2px solid;
        padding: 10px;
    }
</style>
