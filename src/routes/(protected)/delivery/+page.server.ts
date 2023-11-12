import { env } from '$env/dynamic/public';
import { redirect, error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async ({ fetch, locals }) => {
  console.log('delivery/+page.server.ts: Called')
  console.log(`delivery/+page.server.ts: ENV set to: ${env.PUBLIC_ENV}`)
  
  if (!locals.user) {
  console.log("delivery/+page.server.ts: User is NOT logged in")
    throw redirect(302, "/auth/login?page=delivery")
  }
  
  console.log(`delivery/+page.server.ts: Users ID set to: ${locals.user?.id}`)
  
  const deliveryURL = env.PUBLIC_HOST_URL + '/api/v1/private/delivery'
  console.log(`delivery/+page.server.ts: Fetching: ${deliveryURL}`)

  const res = await fetch(deliveryURL, {
    headers: {
      'Authorization': `Bearer ${locals.user.access_token}`,
    },
  })
  const items = await res.json()

  if (res.status === 401) {
    console.log("delivery/+page.server.ts: 401 Found redirecting to login")
    throw redirect(307, '/auth/login?page=delivery');
  }

  if (res.status === 403) {
    console.log("delivery/+page.server.ts: 403 Found (not proper role) redirecting to error page")
    throw error(res.status, 'You shall not pass');
  }

  console.log("delivery/+page.server.ts: Successfully retrieved items")
  return { images: items }
})