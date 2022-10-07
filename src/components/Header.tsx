import React from 'react'
import { useRouter } from 'next/router'
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const Header: React.FC = () => {
  process.env.NEXTAUTH_URL
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname

  return (
    <>
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            サンプルアプリ
          </Typography>
          <Button
            color="primary"
            href="/"
            disabled={isActive('/')}
            sx={{ mr: 2 }}
          >
            ブログリスト
          </Button>
          <Button
            variant="outlined"
            color="primary"
            href="/create"
            disabled={isActive('/create')}
            sx={{ mr: 2 }}
          >
            記事作成
          </Button>
        </Toolbar>
      </AppBar>
    </>
  )
}

export { Header }