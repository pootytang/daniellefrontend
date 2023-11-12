import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/public';
import { redirect } from '@sveltejs/kit';
import { redirect2CallbackPage } from '$helpers';

export const load: PageServerLoad = (async ({ fetch, url, cookies }) => {
  let loginPage = '/auth/login'
  const page = url.searchParams.get('page') // deliver and not /deliver

  if (page !== undefined && page !== '') {
    loginPage = `/auth/login?page=${url.searchParams.get('page')}`
  }
  console.log(`auth/refresh/+page.server.ts: Login Page will be: ${loginPage}`)

  const rtoken = cookies.get('refresh_token')

  if (rtoken === undefined || rtoken === '') {
    console.log('auth/refresh/+page.server.ts: unable to set rtoken to a value. redirect to login page')
    throw redirect(303, loginPage)
  }

  console.log("auth/refresh/+page.server.ts: Calling the API's refresh endpoint")
  const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/auth/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: "refresh_token",
      refresh_token: rtoken,
      client_id: "dani-belle"
    })
  })

  if (res.status === 403) {
    console.log("auth/refresh/+page.server.ts: refresh token may be expired, redirect back to login page")
    throw redirect(303, loginPage)
  }

  console.log("auth/refresh/+page.server.ts: retrieved a new access token. Setting cookie")
  const jsonData = await res.json()

  const access_token = jsonData.access_token
  cookies.set('access_token', access_token, {
    httpOnly: true,
    path: '/',
    secure: false,
    maxAge: 60 * 60 * 24 // 60 seconds = 1 minute, times 60 minutes = 1 hour, times 24 hours = 1 day but token lifetime is only 15 minutes
  })

  console.log(`auth/refresh/+page.server.ts: refresh was successful. Redirecting to /${page}`)
  throw redirect2CallbackPage(303, page || 'home')
  // throw redirect(303, `/${page}`)
})