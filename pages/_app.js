import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    Fathom.load('DUAQBBSR')

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }

    router.events.on('routeChangeComplete', onRouteChangeComplete)

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}

export default App
