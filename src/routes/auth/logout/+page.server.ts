import { redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = (async () => {
  console.log(`auth/logout/+page.server.ts (PageServerLoad): nothing to do, redirecting to home`)
  throw redirect(302, '/')
})

export const actions: Actions = {
  default: async ({cookies}) => {
    console.log(`auth/logout/+page.server.ts (Actions): eating the cookies`)
    cookies.delete('access_token', { path: '/' })
    cookies.delete('refresh_token', { path: '/' })

    // redirect the user
    console.log(`auth/logout/+page.server.ts (Actions): redirecting to login`)
    throw redirect(302, '/auth/login');
  }
};