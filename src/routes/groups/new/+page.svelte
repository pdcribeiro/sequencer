<script>
	import Header from '$components/Header.svelte';
	import * as groups from '$lib/groups/listeners';

	let name = '';
</script>

<Header>
	<button on:click={() => groups.create({ name })}>OK</button>
</Header>

<input type="text" bind:value={name} placeholder="Group name" />
