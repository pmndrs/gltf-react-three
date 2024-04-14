import '../styles/globals.css'
import { TooltipProvider } from '@radix-ui/react-tooltip'

function MyApp({ Component, pageProps }) {
  return (
    <TooltipProvider>
      <Component {...pageProps} />
    </TooltipProvider>
  )
}

export default MyApp
