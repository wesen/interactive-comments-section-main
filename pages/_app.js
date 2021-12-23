import '../styles/globals.css'
import { CurrentUserProvider } from '../src/contexts/CurrentUser'

function MyApp({ Component, pageProps }) {
  return (
    <CurrentUserProvider>
      <Component {...pageProps} />
    </CurrentUserProvider>
  )
}

export default MyApp
