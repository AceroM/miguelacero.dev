import { useState } from 'react'
import '../styles.css'

import { darkThemeClass } from '../stitches.config'
import { SwitchIcon } from '@modulz/radix-icons'
import { IconButton } from '../components/IconButton'

function App({ Component, pageProps }) {
  const [theme, setTheme] = useState(darkThemeClass)

  return (
    <div className={theme}>
      <Component {...pageProps} />

      <IconButton style={{ position: 'fixed', zIndex: 999, left: 15, bottom: 15 }} onClick={() => setTheme(theme ? undefined : darkThemeClass)}>
        <SwitchIcon />
      </IconButton>
    </div>
  )
}

export default App
