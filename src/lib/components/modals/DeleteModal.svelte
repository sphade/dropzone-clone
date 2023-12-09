<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { idStore } from '$lib/stores/idStore';
	import { deleteModalStore } from '$lib/stores/modalStore';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	let loading = false;
	$: {
		if ($page.form?.deleteFileError) {
			toast.error($page.form.deleteFileError);
		}
	}
	$: {
		if ($page.form?.deleteFileSuccess) {
			toast.success($page.form.deleteFileSuccess);
			deleteModalStore.setFalse();
		}
	}
</script>

<Dialog.Root open={$deleteModalStore} onOpenChange={deleteModalStore.setFalse}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title class="text-center capitalize text-lg"
				>are you sure you want to delete this file?</Dialog.Title
			>
		</Dialog.Header>
		<form
			method="POST"
			use:enhance={() => {
				loading = true;

				return async ({ update }) => {
					await update();
					loading = false;
				};
			}}
			action="/dashboard?/deleteFile"
		>
			<input type="text" name="id" hidden value={$idStore} />
			<div class="grid grid-cols-2 items-center gap-5">
				<Button on:click={deleteModalStore.setFalse} variant="outline">cancel</Button>
				<Button type="submit" variant="destructive">
					{#if loading}
						<Loader2 class="animate-spin" />
					{:else}
						delete
					{/if}
				</Button>
			</div>
		</form>
	</Dialog.Content>
</Dialog.Root>
