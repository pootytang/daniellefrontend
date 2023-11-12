import { env } from '$env/dynamic/public';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch }) => {
  console.log("dob/+page.server.ts: Fetching: " + env.PUBLIC_HOST_URL + '/api/v1/public/birth_day')
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/public/birth_day')

  if (!res.ok) {
    console.log(`dob/+page.server.ts: Problem fetching ultrasound images. retrieved status: ${res.status}`)
    console.log(`dob/+page.server.ts: ${res.statusText}`)
    throw error(res.status, 'Ohh Boy, something happened!');
  }
  
  console.log('dob/+page.server.ts: returning the retrieved images')
  const items = await res.json()
  // console.table(items)

  return { images: items }
})