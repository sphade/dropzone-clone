<script lang="ts">
	import Logo from './Logo.svelte';
	import ToggleMode from './ToggleMode.svelte';
	import Button from './ui/button/button.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { signOut } from 'firebase/auth';
	import { auth } from '$lib/firebaseConfig';
	async function logOut() {
		await fetch('/', {
			method: 'DELETE'
		});
		await signOut(auth);
		goto('/');
	}
</script>

<header class=" bg-background sticky top-0 left-0 flex items-center justify-between">
	<Logo />
	<div class="flex gap-5 items-center">
		<ToggleMode />
		{#if $page.data.user}
			<Avatar.Root>
				<Avatar.Image
					src={$page.data.user.profilePic}
					alt="{$page.data.user.name} profile picture"
				/>
			</Avatar.Root>
			<Button on:click={logOut} variant="ghost" class="">Sign out</Button>
		{/if}
	</div>
</header>
