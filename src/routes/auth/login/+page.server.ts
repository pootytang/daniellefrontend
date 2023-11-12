import { env } from '$env/dynamic/public';
// import { redirect } from '@sveltejs/kit';
import { error, fail, redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";
import type { PageServerLoad } from './$types';
import { redirect2CallbackPage } from '$helpers';

export const load: PageServerLoad = (async ({ url }) => {
  console.log(`login/+page.server.ts (PageServerLoad): URL Params: ${url.searchParams.get('page')}`)
  let cbPage = url.searchParams.get('page')
  if (!cbPage || cbPage === 'null') {
    console.log(`login/+page.server.ts (PageServerLoad): setting cbPage to path: home`)
    cbPage = 'home'
  }

  console.log("login/+page.server.ts (PageServerLoad): Call Back page set to", cbPage)
  return { data: cbPage }
})

export const actions: Actions = {
  default: async ({request,url, fetch, cookies}) => {
    console.log(`login/+page.server.ts (Actions): Called with URL Params: ${url.searchParams.get('page')}`)
    
    let page = url.searchParams.get('page')
    if (!page || page === 'null') {
      console.log('login/+page.server.ts (Actions): setting callback page to "home"')
      page = 'home'
    }

    const formData = Object.fromEntries(await request.formData());
    console.log("login/+page.server.ts (Actions): Checking that email, and password was populated")
    if (!formData.email || !formData.password) {
			return fail(400, {
				error: 'Missing email or password'
			});
		}
    
    console.log("login/+page.server.ts (Actions): Posting to API")
    const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.pass,
      })
    })
    
    console.log("login/+page.server.ts (Actions): Got result of: ", res.status)
    if (res.status != 200) {
      switch (res.status) {
        case 400:
          console.error("login/+page.server.ts (Actions): Bad Payload Sent")
          return fail(res.status, { error: "invalid payload sent" })
          break
        case 401:
          console.error("login/+page.server.ts (Actions): invalid email or password")
          return fail(res.status, { error: "invalid email or password" })
          break
        case 500:
          console.error("login/+page.server.ts (Actions): Access Token Generation Error")
          throw error(res.status, 'Something just happened somewhere out there');
          break
        default:
          console.error(`login/+page.server.ts (Actions): Server returned error: ${res.statusText}`)
          return fail(res.status, { error: "unhandled error" })
      }
    }

    console.log("login/+page.server.ts (Actions): Logged In successfully. Grab access and refresh tokens")
    const jsonData = await res.json()

    // User object shape: (ID, Name, Email, Access_Token, Refresh_Token, Logged_In, Role, CreatedAt, UpdatedAt)
    const access_token = jsonData.user.access_token
    const refresh_token = jsonData.user.refresh_token

    cookies.set('access_token', access_token, {
      httpOnly: true,
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24 // 1 day
    })

    cookies.set('refresh_token', refresh_token, {
      httpOnly: true,
      path: '/',
      secure: false,
      maxAge: 60 * 60 * 24 * 5 // 5 days
    })

    console.log(`login/+page.server.ts (Actions): Access and Refresh tokens set in cookies. Redirecting to ${page}`)
    throw redirect2CallbackPage(302, page)
    // if (page === 'home') {
    //   throw redirect(302, '/')
    // } else {
    //   throw redirect(302, `/${page}`)
    // }
  }
};