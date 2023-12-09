<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { idStore } from '$lib/stores/idStore';
	import { renameFileModalStore } from '$lib/stores/modalStore';
	import { Loader2 } from 'lucide-svelte';
	import toast from 'svelte-french-toast';
	let loading = false;
	$: {
		if ($page.form?.editFileNameError) {
			toast.error($page.form.editFileNameError);
		}
	}
	$: {
		if ($page.form?.editFileNameSuccess) {
			toast.success($page.form.editFileNameSuccess);
			renameFileModalStore.setFalse();
		}
	}
</script>

<Dialog.Root open={$renameFileModalStore} onOpenChange={renameFileModalStore.setFalse}>
	<Dialog.Content class="sm:max-w-[425px]">
		<Dialog.Header>
			<Dialog.Title>Edit File Name</Dialog.Title>
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
			action="/dashboard?/editFileName"
			class="space-y-4"
		>
			<div>
				<p class="py-5">Name</p>
				<Input name="fileName" />
				<input name="id" hidden={true} value={$idStore} />
			</div>

			<Dialog.Footer>
				<Button type="submit">
					{#if loading}
						<Loader2 class="animate-spin" />
					
					{:else}
						Save changes
					{/if}
				</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
