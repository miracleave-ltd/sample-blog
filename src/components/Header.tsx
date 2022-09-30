import React from 'react'
import { useRouter } from 'next/router'
import { signIn, signOut, useSession } from 'next-auth/react'
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography, useTheme } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'

const Header: React.FC = () => {
  process.env.NEXTAUTH_URL
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  // const { data: session, status } = useSession()

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

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
          {/* { status === 'loading' && (
            <Typography>読み込み中...</Typography>
          )}
          { status != 'loading' && !session && (
            <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }} onClick={() => signIn('google')}>
              ログイン
            </Button>
          )} */}
          {/* { session && ( */}
            <>
              {/* <Button
                color="primary"
                href="/drafts"
                disabled={isActive('/drafts')}
                sx={{ mr: 2 }}
              >
                下書きリスト
              </Button> */}
              <Button
                variant="outlined"
                color="primary"
                href="/create"
                disabled={isActive('/create')}
                sx={{ mr: 2 }}
              >
                記事作成
              </Button>
              {/* <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton> */}
              {/* <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={() => signOut()}>ログアウト</MenuItem>
              </Menu> */}
            </>
          {/* )} */}
        </Toolbar>
      </AppBar>
    </>
  )
}

export { Header }