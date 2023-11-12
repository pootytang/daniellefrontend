<script lang="ts">
	// import Icon from '@iconify/svelte';
	import { Section, Register } from 'flowbite-svelte-blocks';
	import { Button, Label, Input } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const registerPage = `/auth/signup?page=${data.data}`;
</script>

<Section name="login">
	<Register href="/">
		<svelte:fragment slot="top">REGISTER</svelte:fragment>
		<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
			<form class="flex flex-col space-y-6" method="POST" action={registerPage}>
				<Label class="space-y-2">
					<span>Your Name *</span>
					<Input type="text" name="name" required />
				</Label>
				<Label class="space-y-2">
					<span>Your email *</span>
					<Input type="email" name="email" placeholder="name@company.com" size="md" required />
				</Label>
				<Label class="space-y-2">
					<span>Your password *</span>
					<Input type="password" name="password" placeholder="•••••" required />
				</Label>
				<Label class="space-y-2">
					<span>Confirm password *</span>
					<Input type="password" name="confirm_password" placeholder="•••••" required />
				</Label>
				<Button type="submit" class="w-full1">Sign in</Button>
			</form>
		</div>
	</Register>
</Section>
