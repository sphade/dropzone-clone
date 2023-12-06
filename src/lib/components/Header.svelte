<script lang="ts">
	import Logo from './Logo.svelte';
	import ToggleMode from './ToggleMode.svelte';
	import Button from './ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	async function signOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		goto('/');
	}
</script>

<header class=" bg-background sticky top-0 left-0 flex items-center justify-between">
	<Logo />
	<div class="flex gap-5 items-center">
		<ToggleMode />
		{#if $page.data.user}
			<Avatar.Root class="cursor-pointer">
				<Avatar.Image
					on:click={signOut}
					src={$page.data.user.profilePic}
					alt="{$page.data.user.name} profile picture"
				/>
			</Avatar.Root>
			<Button on:click={signOut} variant="ghost" class="">Sign out</Button>
		{/if}
	</div>
</header>
