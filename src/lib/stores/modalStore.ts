import { writable } from 'svelte/store';

export const modalStore = (modalState: boolean) => {
	const { subscribe, set, update } = writable(modalState);

	function setTrue() {
		set(true);
	}
	function setFalse() {
		set(false);
	}
	function toggleModal() {
		update((modalState) => (modalState = !modalState));
	}
	return {
		subscribe,
		setTrue,
		setFalse,
		toggleModal
	};
};
export const renameFileModalStore = modalStore(false);
export const deleteModalStore = modalStore(false);

