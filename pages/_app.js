import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('DUAQBBSR')

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}

export default App
