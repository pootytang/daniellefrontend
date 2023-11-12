import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("infant/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/zero-one')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/zero-one')

  if (!res.ok) {
    console.log(`infant/+page.server.ts: Problem fetching early adulthood images. retrieved status: ${res.status}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }

  const items = await res.json()
  
  console.log('infant/+page.server.ts: returning the retrieved images')
  return { images: items }
})