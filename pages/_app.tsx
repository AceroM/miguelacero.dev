import {AppProps} from 'next/app'
import globalStyles from '../styles/globalStyles'
import {ChakraProvider, extendTheme} from '@chakra-ui/react'
import { createBreakpoints } from "@chakra-ui/theme-tools"

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
}
const theme = extendTheme({ colors })

const breakpoints = createBreakpoints({
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
})

theme.breakpoints = breakpoints

const App = ({Component, pageProps}: AppProps) => {
  globalStyles()
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
