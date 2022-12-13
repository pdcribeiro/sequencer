<script>
	import { goBack } from "$lib/common/utils";
</script>

<div>
	<button on:click={() => goBack()}>Back</button>
	<slot />
</div>
