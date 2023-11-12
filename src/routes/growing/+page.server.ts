import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("growing/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/growingmommy')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/growingmommy')

  if (!res.ok) {
    console.log(`growing_mommy/+page.server.ts: Problem fetching ultrasound images. retrieved status: ${res.status}`)
    console.log(`growing_mommy/+page.server.ts: ${res.statusText}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }

  const items = await res.json()
  
  console.log('growing_mommy/+page.server.ts: returning the retrieved images')
  return { images: items }
})