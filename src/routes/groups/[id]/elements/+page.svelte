<script lang="ts">
	import type { PageData } from './$types';
	
	import Header from '$components/Header.svelte';

	export let data: PageData;
</script>

<Header />

<h1>{data.group.name}</h1>

<a href="elements/new">Add element</a>

<ul>
	{#each data.elements as element (element.id)}
		<a href="/elements/{element.id}">{element.name}</a>
	{/each}
</ul>
