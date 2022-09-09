import { ThemeProvider, useTheme } from "@mui/material"
import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  )
}

export default App
