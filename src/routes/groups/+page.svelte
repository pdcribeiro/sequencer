<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Groups</h1>

<a href="/groups/new">Add group</a>

<ul>
	{#each data.groups as group (group.id)}
		<a href="/groups/{group.id}">{group.name}</a>
	{/each}
</ul>
