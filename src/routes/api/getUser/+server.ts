import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/public';

export const GET: RequestHandler =( ({ cookies }) => {
  console.log(`getUser -> GET(): called. Fetching user from ${env.PUBLIC_HOST_URL}/api/v1/auth/user`)
  return fetch(`${env.PUBLIC_HOST_URL}/api/v1/auth/user`, {
    headers: { 'Authorization': `Bearer ${cookies.get('access_token')}` }, 
  });
})