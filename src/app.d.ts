// See https://kit.svelte.dev/docs/types#app

import type { TUser } from "$lib/types";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			userId: string | null;
		}
		interface PageData {
			user:TUser
		}
		// interface Platform {}
	}
}

export {};
