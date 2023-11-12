import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("earlyadult/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/twenty-fortyfour')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/twenty-fortyfour')

  if (!res.ok) {
    console.log(`earlyadult/+page.server.ts: Problem fetching early childhood images. retrieved status: ${res.status}`)
    console.log(`earlyadult/+page.server.ts: ${res.statusText}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }

  const items = await res.json()
  
  console.log('earlyadult/+page.server.ts: returning the retrieved images')
  return { images: items }
})