<script>
	import '../app.postcss';
	import '../app.postcss';

	import { page } from '$app/stores';
	import { ChevronDownSolid } from 'flowbite-svelte-icons';
	import {
		Button,
		DarkMode,
		Dropdown,
		DropdownDivider,
		DropdownItem,
		GradientButton,
		Navbar,
		NavBrand,
		NavHamburger,
		NavLi,
		NavUl
	} from 'flowbite-svelte';

	const PreBirth = [
		{ text: 'Ultrasounds', href: '/ultrasounds' },
		{ text: 'Growing Mommy', href: '/growing' },
		{ text: 'Baby Shower / Reveal', href: '/shower_reveal' }
	];

	const Birth = [
		{ text: 'Day of Birth', href: '/dob' },
		{ text: 'Delivery (private)', href: '/delivery' }
	];

	const Stages = [
		{ text: 'Infancy (0 - 1 year)', href: '/infant' },
		{ text: 'Toddlerhood (1 - 2 years)', href: '/toddler' },
		{ text: 'Early Childhood (3 - 6 years)', href: '/earlychild' },
		{ text: 'Late Childhood (7 - 10 years)', href: '/latechild' },
		{ text: 'Adolescence (11 - 19 years)', href: '/adolescence' },
		{ text: 'Early Adulthood (20 - 44 years)', href: '/earlyadult' },
		{ text: 'Middle Adulthood (45 - 64 years)', href: '/midadult' },
		{ text: 'Late Adulthood (65+)', href: '/lateadult' }
	];
</script>

<svelte:head>
	<title>Gelanez Baby</title>
</svelte:head>

<div class="flex flex-col">
	<Navbar let:hidden let:toggle>
		<NavBrand href="/">
			<img src="/images/logo.png" class="mr-3 h-6 sm:h-9" alt="Docly Logo" />
			<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
				D.A.J.
			</span>
		</NavBrand>

		<div class="flex md:order-2">
			<Button color="light"
				>Account<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" /></Button
			>

			<!-- USER STUFF -->
			{#if $page.data.user}
				<Dropdown>
					<div slot="header" class="px-4 py-2">
						<span class="block truncate text-sm font-medium">{$page.data.user.email}</span>
					</div>
					<DropdownItem href="/account">Settings</DropdownItem>
					<DropdownItem href="/account">Billing</DropdownItem>
					<form action="/auth/logout" method="POST">
						<DropdownItem slot="footer" type="submit">Log Out</DropdownItem>
					</form>
				</Dropdown>
			{:else}
				<Dropdown>
					<div slot="header" class="px-4 py-2">
						<span class="block truncate text-sm font-medium">No one home</span>
					</div>
					<form action="/logout" method="POST">
						<DropdownItem slot="footer" href="/auth/login">Login</DropdownItem>
					</form>
				</Dropdown>
			{/if}

			<NavHamburger on:click={toggle} />
			<DarkMode initialtheme="light" />
		</div>
		<NavUl {hidden}>
			<NavLi href="/">
				<GradientButton outline color="purpleToPink">Home</GradientButton>
			</NavLi>
			<NavLi id="pb" class="cursor-pointer">
				<GradientButton outline color="purpleToPink"
					>Before Birth
					<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
				</GradientButton>
			</NavLi>
			<NavLi id="birth" class="cursor-pointer">
				<GradientButton outline color="purpleToPink"
					>Birth
					<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
				</GradientButton>
			</NavLi>
			<NavLi id="stages" class="cursor-pointer">
				<GradientButton outline color="purpleToPink"
					>Stages
					<ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white" />
				</GradientButton>
			</NavLi>
			<Dropdown triggeredBy="#pb" class="w-44 z-20">
				{#each PreBirth as pb}
					<DropdownItem href={pb.href}>{pb.text}</DropdownItem>
					<DropdownDivider />
				{/each}
			</Dropdown>

			<Dropdown triggeredBy="#birth" class="w-44 z-20">
				{#each Birth as b}
					<DropdownItem href={b.href}>{b.text}</DropdownItem>
					<DropdownDivider />
				{/each}
			</Dropdown>

			<Dropdown triggeredBy="#stages" class="w-44 z-20">
				{#each Stages as stage}
					<DropdownItem href={stage.href}>{stage.text}</DropdownItem>
					<DropdownDivider />
				{/each}
			</Dropdown>
		</NavUl>
	</Navbar>
</div>

<div class="w-full flex-grow px-2 sm:px-4">
	<div class="container mx-auto">
		<slot />
	</div>
</div>
