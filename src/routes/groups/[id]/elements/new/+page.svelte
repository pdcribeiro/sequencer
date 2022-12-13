<script>
	import Header from '$components/Header.svelte';
	import * as elements from '$lib/elements/listeners';

	let name = '';
</script>

<Header>
	<button on:click={() => elements.create({ name })}>OK</button>
</Header>

<input type="text" bind:value={name} placeholder="Element name" />
