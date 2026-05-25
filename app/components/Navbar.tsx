"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

const Links = [
  { path: '/', element: 'Home' },
  { path: '/about', element: 'About' },
  { path: '/gallary', element: 'Gallary' },
  { path: '/products', element: 'Products' },
  { path: '/contact', element: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [drawerOpen, setDrawerOpen] = useState(false)

  const isActive = (path) =>
    pathname === path || pathname.startsWith(path + '/')

  const navLinks = (
    <>
      {Links.map((link) => (
        <Button
          key={link.element}
          component={Link}
          href={link.path}
          sx={{
            color: isActive(link.path) ? 'error.main' : 'text.primary',
            fontWeight: isActive(link.path) ? 'bold' : 'medium',
            textTransform: 'none',
            fontSize: '0.95rem',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
        >
          {link.element}
        </Button>
      ))}
    </>
  )

  const drawerContent = (
    <Box sx={{ width: 220 }} role="presentation">
      <List>
        {Links.map((link) => (
          <ListItem key={link.element} disablePadding>
            <ListItemButton
              component={Link}
              href={link.path}
              onClick={() => setDrawerOpen(false)}
              selected={isActive(link.path)}
              sx={{
                '&.Mui-selected': {
                  color: 'error.main',
                  fontWeight: 'bold',
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <ListItemText
                primary={link.element}
                slotProps={{
                  primary: {
                    fontWeight: isActive(link.path) ? 'bold' : 'normal',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ maxWidth: '1280px', width: '100%', mx: 'auto', px: 2 }}>
        {/* Logo */}
        <Typography
          component={Link}
          href="/"
          variant="h6"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            color: 'text.primary',
            textDecoration: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          Next-App
        </Typography>

        {/* Desktop Nav */}
        {!isMobile && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navLinks}
          </Box>
        )}

        {/* Mobile Hamburger */}
        {isMobile && (
          <>
            <IconButton
              edge="end"
              aria-label="Open main menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
            >
              {drawerContent}
            </Drawer>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}