export default function getCallbackPage(queryParam: string) {
	let cbPage 
  if (!queryParam) {
    console.log('getCallbackPage(): queryparam is empty leaving callback page to Home')
    cbPage = 'home'
  } else {
    console.log(`getCallbackPage(): setting cbPage to search param: ${queryParam}`)
    cbPage = queryParam
  }

  if (!cbPage || cbPage === '/null' || cbPage === 'null') {
    console.log(`getCallbackPage(): callback is null, setting to home`)
    cbPage = 'home'
  }

  return cbPage
}