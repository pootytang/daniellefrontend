import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("Ultrasounds/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/ultrasounds')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/ultrasounds')
  

  if (!res.ok) {
    console.log(`Ultrasounds/+page.server.ts: Problem fetching ultrasound images. retrieved status: ${res.status}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }

  const items = await res.json()
  
  console.log('Ultrasounds/+page.server.ts: returning the retrieved images')
  return { images: items }
})