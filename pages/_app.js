import '../styles/globals.css'
import { CurrentUserProvider } from '../src/contexts/CurrentUser'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

function MyApp({ Component, pageProps }) {
  return (
    <CurrentUserProvider>
      <Component {...pageProps} />
    </CurrentUserProvider>
  )
}

export default MyApp
