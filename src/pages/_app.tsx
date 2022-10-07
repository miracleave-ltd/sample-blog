import { ThemeProvider, useTheme } from "@mui/material"
import { AppProps } from "next/app"

const App = ({ Component, pageProps }: AppProps) => {
  const theme = useTheme()
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default App
