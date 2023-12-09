<script lang="ts">
	import { page } from '$app/stores';
	import DataGrid from '$lib/components/DataGrid.svelte';
	import DropZone from '$lib/components/DropZone.svelte';
	import toast from 'svelte-french-toast';
	export let data;
	
</script>

<div class="max-w-5xl mx-auto">
	<DropZone />
	<DataGrid files={data.files} count={data.count} />
</div>
