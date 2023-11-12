import type { Handle } from "@sveltejs/kit";
// import { env } from '$env/dynamic/public';
// import { getCallbackPage} from "$helpers";

export const handle: Handle = async ({ event, resolve }) => {
  console.log(`Handle Hook() BEGIN: Called for path, ${event.url.pathname} and search parameter ${event.url.searchParams.get('page')}`)

  // HANDLE THE AUTH PAGES
  if (event.url.pathname.includes('/auth')) {
    console.log("Handle Hook(): auth page called. Going to page: ", event.url.pathname)
    return await resolve(event)
  }

  // HANDLE THE GETUSER
  if (event.url.pathname.includes('/getUser')) {
    console.log("Handle Hook(): calling sveltekits api/getUser page at:", event.url.pathname)
    return await resolve(event)
  }

  // IF WE HAVE AN ACCESS TOKEN THEN USER LOGGED IN SET LOCALS
  console.log("Handle Hook(): checking for an access_token")
  const at = event.cookies.get('access_token')

  if (at) {
    console.log("Handle Hook(): access_token found getting user")
    try {
      const res = await event.fetch('/api/getUser')
      if (!res.ok) {
        console.log(`Handle Hook(): Bad response fetching user: ${res.status}`)
        if (res.status == 401) {
          console.log('Handle Hook(): 401 found possibly an expired cookie. Refreshing the cookie')
          console.log("Handle Hook(): Refresh initiated for page ", event.url.pathname.replace('/', ''))
          return new Response('Redirect', {status: 303, headers: { Location: `/auth/refresh?page=${event.url.pathname.replace('/', '')}`}})
        }
        throw res
      }
      console.log('Handle Hook(): Good Response from user endpoint')
      const jsonData = await res.json()

      console.log('Handle Hook(): retrieved the user data')
      event.locals.user = jsonData.user
    } catch (error) {
      console.log(`Handle Hook(): Received an error`)
      console.table(error)
    }
  } else {
    console.log('Handle Hook(): No access token found')
  }

  // NO LOCAL USER, NO ACCESS TOKEN, PUBLIC PAGE REQUESTED. ACCESS IS ALLOWED (MAYBE ALWAYS REQUIRE A LOGON)
  console.log('Handle Hook() END: Resolving for path', event.url.pathname)
  return await resolve(event)
}