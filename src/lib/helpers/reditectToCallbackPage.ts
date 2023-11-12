import { redirect } from "@sveltejs/kit"

type StatusCode =  300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308
export default function redirectCBPage(code: StatusCode, page: string) {
  console.log(`redirect2callback(): Called with page: ${page}`)
  if (page === 'home') {
    return redirect(code, '/')
  } else {
    return redirect(code, `/${page}`)
  }
}