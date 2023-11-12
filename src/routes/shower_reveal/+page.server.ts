import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("shower_reveal/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/shower_reveal')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/shower_reveal')

  if (!res.ok) {
    console.log(`shower_reveal/+page.server.ts: Problem fetching ultrasound images. retrieved status: ${res.status}`)
    console.log(`shower_reveal/+page.server.ts: ${res.statusText}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }

  const items = await res.json()
  
  console.log('shower_reveal/+page.server.ts: returning the retrieved images')
  return { images: items }
})