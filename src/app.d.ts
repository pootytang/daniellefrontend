// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: {
				id: string;
				email: string;
				access_token: string;
				refresh_token: string;
			},
			callbackPage?: string
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
