<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	import { auth, db } from '$lib/firebaseConfig';
	import toast, { Toaster } from 'svelte-french-toast';
	import { goto } from '$app/navigation';
	import { doc, setDoc } from 'firebase/firestore';
	
	const provider = new GoogleAuthProvider();

	async function signInWithGoogle() {
		try {
			const { user } = await signInWithPopup(auth, provider);
			const idToken = await user.getIdToken();

			const response = await fetch('/', {
				method: 'POST',
				body: JSON.stringify(idToken),
				headers: {
					'content-type': 'application/json'
				}
			});
			if (!response.ok) {
				const errorResponse = await response.json();
				toast.error(errorResponse.message);
				return;
			}
			await setDoc(doc(db, 'users', user.uid), {
				name: user.displayName,
				email: user.email,
				profilePic: user.photoURL,
				uid: user.uid
			});
			toast.success('successful!, redirecting...');
			goto('/dashboard');
		} catch (error) {
			const errorMessage = (error as Error).message;

			toast.error(errorMessage);
		}
	}
</script>


<div class="bg-[#1e1919]">
	<div class=" text-white text-center pt-[72px] max-w-[777px] mx-auto">
		<h1 class="text-6xl">Securely collaborate on your content anywhere, anytime</h1>

		<p class="text-lg mt-5">
			With Dropbox, you get a full suite of tools designed to help you create, share, manage, and
			track content more efficiently. Plus, proven cloud storage you can trust.
		</p>
		<Button
			on:click={() => {
				signInWithGoogle();
			}}
			class="p-6 text-black capitalize font-semibold mt-10"
			>get started now
			<ArrowRight class="w-5 h-5" />
		</Button>
	</div>
	<video class="mt-10" autoplay playsinline loop muted>
		<track kind="captions" />
		<source
			src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/dropbox/dbx1-hero-1920x1080.mp4"
			type="video/mp4"
		/>
	</video>
</div>
