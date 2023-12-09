<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import {  Trash } from 'lucide-svelte';
	import Button from './ui/button/button.svelte';
	import prettyBytes from 'pretty-bytes';
	import type { TFiles } from '$lib/types';
	import { deleteModalStore, renameFileModalStore } from '$lib/stores/modalStore';
	import RenameModal from './modals/RenameModal.svelte';

	import { idStore } from '$lib/stores/idStore';
	import DeleteModal from './modals/DeleteModal.svelte';
	export let files: TFiles[];
	export let count: number;
	function getFileType(mime: string) {
		const type = mime.split('/')[1];
		return type;
	}
</script>

<div class="border rounded-md my-10 shadow-md">
	<h1 class="py-5 capitalize font-medium text-xl pl-5">files({count})</h1>
	{#if files.length === 0}
		<div class="flex justify-center items-center h-[200px]">
			<p class="text-gray-500">no files found</p>
		</div>
	{:else}
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">type</Table.Head>
					<Table.Head>file name</Table.Head>
					<Table.Head>file size</Table.Head>
					<Table.Head>date added</Table.Head>
					<Table.Head >link</Table.Head>
					<Table.Head class="sr-only">delete</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each files as file, i (i)}
					<Table.Row>
						<Table.Cell class="font-medium">{getFileType(file.type)}</Table.Cell>
						<Table.Cell>
							<Button
								variant="link"
								on:click={() => {
									idStore.set(file.id);
									renameFileModalStore.setTrue();
								}}
							>
								{file.fileName}
							</Button>
						</Table.Cell>
						<Table.Cell>{prettyBytes(file.size)}</Table.Cell>
						<Table.Cell>{file.timestamp.toDateString()}</Table.Cell>
						<Table.Cell >
							<Button download target='_blank' variant="link" href={file.downloadUrl}>download</Button>
						</Table.Cell>
						<Table.Cell class="text-right">
							<Button
								size="icon"
								variant="outline"
								on:click={() => {
									idStore.set(file.id);
									deleteModalStore.setTrue();
								}}><Trash /></Button
							>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
			
		</Table.Root>
	{/if}
</div>

<RenameModal />
<DeleteModal />
