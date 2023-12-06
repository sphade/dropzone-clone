<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { page } from '$app/stores';
	import { db, storage } from '$lib/firebaseConfig';
	import { cn } from '$lib/utils';
	import { addDoc, collection, serverTimestamp, updateDoc } from 'firebase/firestore';
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import toast from 'svelte-french-toast';

	let isDragging = false;
	let files: File[] = [];
	let fileInput: HTMLInputElement;
	//     const ONE_KB = 1024;
	// const ONE_MB = ONE_KB * 1024;
	// let maxSizeInMegabytes = 10;
	// let maxSizeInBytes = maxSizeInMegabytes * ONE_MB;
	const maxSize = 10 * 1024 * 1024;
	let uid = $page.data.user.uid;
	function handleDragEnter() {
		isDragging = true;
	}

	function handleDragLeave() {
		isDragging = false;
	}

	function handleDrop(event: DragEvent) {
		isDragging = false;
		if (event.dataTransfer?.files) {
			const droppedFiles = Array.from(event.dataTransfer?.files);
			checkFileSizeAndUpload(droppedFiles);
		}
	}

	function handleClick(event: MouseEvent) {
		fileInput.click();
	}

	const handleFileSelect = () => {
		// Handle the selected files here
		if (fileInput.files) {
			const selectedFiles = Array.from(fileInput.files);
			checkFileSizeAndUpload(selectedFiles);
		}
	};

	async function checkFileSizeAndUpload(files: File[]) {
		const allFilesValid = files.every((file) => {
			if (file.size > maxSize) {
				alert(`Error: ${file.name} file size exceeds 10MB`);
				return false;
			}

			return true;
		});

		if (allFilesValid) {
			await toast.promise(Promise.all(files.map(HandleUpload)), {
				loading: 'uploading...',
				success: 'uploaded successfully',
				error: 'Could not upload.'
			});
			await invalidateAll();
		}
	}
	async function HandleUpload(file: File) {
		const docRef = await addDoc(collection(db, 'files'), {
			uid,
			fileName: file.name,
			size: file.size,
			type: file.type,
			timestamp: serverTimestamp()
		});

		const fileRef = ref(storage, `user/${uid}/files/${docRef.id}`);
		await uploadBytes(fileRef, file);
		const downloadUrl = await getDownloadURL(fileRef);
		await updateDoc(docRef, {
			downloadUrl
		});
	}
</script>

<button
	class={cn('w-full rounded-lg bg-border/50 h-44 border-4 border-dashed', {
		'bg-primary/50 border-primary': isDragging
	})}
	on:dragenter|preventDefault={handleDragEnter}
	on:dragleave|preventDefault={handleDragLeave}
	on:dragover|preventDefault
	on:drop|preventDefault={handleDrop}
	on:click={handleClick}
>
	{#if isDragging}
		Drop the file here
	{:else}
		Drag and drop a file here or click to add files
	{/if}

	<input bind:this={fileInput} on:change={handleFileSelect} type="file" multiple hidden />
</button>
