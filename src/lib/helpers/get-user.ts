import { env } from '$env/dynamic/public';

export default async function getUserData(token: string): Promise<ReturnedObject> {
  console.log(`helpers.getUserData(): Calling api's user endpoint @: ${env.PUBLIC_HOST_URL}/api/v1/auth/user`)

  let ru: RetrievedUser = {
    id: '',
    name: '',
    email: '',
    role: '',
    access_token: '',
    refresh_token: ''
  }
  
  let ro: ReturnedObject = {
    user: ru,
    status: 400,
    message: ''
  }

  if (token) {
    const res = await fetch(env.PUBLIC_HOST_URL + '/api/v1/auth/user', {
      headers: { 'Authorization': `Bearer ${token}` },
    })
  
    if (!res.ok) {  
      console.log(`helpers.getUserData(): Received a bad status: Code = ${res.status} Message = ${res.statusText}`)
      ro.status = res.status
      ro.message = res.statusText
    } else {
      const jData = await res.json();
    console.log('helpers.getUserData(): Successfully retrieved user')
    ro.user = jData.user
    ro.status = res.status
    ro.message = res.statusText
    }
  } else {
    console.log('helpers.getUserData(): empty token, did not call user endpoint')
  }

  console.log(`helpers.getUserData(): Returning object with status ${ro.status}`)
  return ro
}