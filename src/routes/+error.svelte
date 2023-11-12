<script>
	import { page } from '$app/stores';
</script>

<svelte:head>
	<meta charset="utf-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />

	<title>Ohh No!!!</title>

	<!-- Google font -->
	<link href="https://fonts.googleapis.com/css?family=Montserrat:700,900" rel="stylesheet" />
</svelte:head>

<div id="notfound">
	<div class="notfound">
		<div class="notfound-404">
			<h1>{$page.status}</h1>
			<h2>{$page.error?.message}</h2>
		</div>
		<a href="/">Home</a>
	</div>
</div>
<span style="font-size: 10em;" />

<style>
	@import 'error.css';
</style>
