import React, { ReactNode } from "react"
import { Header } from "@/components/Header"
import { NextPage } from "next"
import { Outlet } from "@mui/icons-material"
import { Box, Container, CssBaseline } from "@mui/material"

type Props = {
  children: ReactNode
}

const Layout: NextPage<Props> = (props) => (
  <Box sx={{ display: 'flex' }}>
    <CssBaseline />
    <Header />
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 11, mb: 4 }}>
        {props.children}
      </Container>
    </Box>
    <Outlet />
  </Box>
)

export { Layout }
