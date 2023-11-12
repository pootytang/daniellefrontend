<script lang="ts">
	import type { PageData } from './$types';
	import { Gallery } from 'flowbite-svelte';

	export let data: PageData;
	const { images } = data;
</script>

<!-- <Gallery items={data.item} class="gap-4 grid-cols-2 md:grid-cols-3" /> -->
<Gallery class="gap-4 grid-cols-2 md:grid-cols-3" items={images} let:item>
	<div class="">
		<a href={item.src}>
			<img
				src={item.src}
				alt={item.alt}
				class="h-auto max-w-full hover:scale-125 transition-all duration-500"
			/>
		</a>
	</div>
</Gallery>
