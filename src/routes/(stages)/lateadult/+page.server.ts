import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("lateadult/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/sixtyfiveplus')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/sixtyfiveplus')

  if (!res.ok) {
    console.log(`lateadult/+page.server.ts: Problem fetching late adulthood images. retrieved status: ${res.status}`)
    console.log(`lateadult/+page.server.ts: ${res.statusText}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }
  
  console.log('lateadult/+page.server.ts: returning the retrieved images')
  const items = await res.json()

  return { images: items }
})