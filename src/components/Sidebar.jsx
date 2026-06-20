import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
} from '@mui/material'
import BookIcon from '@mui/icons-material/Book'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SettingsIcon from '@mui/icons-material/Settings'
import InfoIcon from '@mui/icons-material/Info'

const DRAWER_WIDTH = 260

function Sidebar() {
  const location = useLocation()

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      id: 'books',
      label: 'Books',
      icon: <BookIcon />,
      path: '/books',
    },
    {
      id: 'authors',
      label: 'Authors',
      icon: <InfoIcon />,
      path: '/authors',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings',
    },
  ]

  return (
    <Drawer
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          backgroundColor: '#1e1e2e',
          color: '#fff',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <BookIcon sx={{ fontSize: 32, color: '#4f46e5' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          BookHub
        </Typography>
      </Box>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />

      <List sx={{ pt: 2 }}>
        {menuItems.map(item => (
          <ListItem key={item.id} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              sx={{
                mx: 1,
                borderRadius: 1,
                backgroundColor: location.pathname === item.path ? 'rgba(79, 70, 229, 0.2)' : 'transparent',
                color: location.pathname === item.path ? '#4f46e5' : '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(79, 70, 229, 0.15)',
                },
                transition: 'all 0.3s ease',
                textDecoration: 'none',
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 40,
                  color: location.pathname === item.path ? '#4f46e5' : '#fff',
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.95rem',
                  fontWeight: location.pathname === item.path ? 600 : 400,
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.1)', mt: 'auto', mb: 2 }} />

      <Box sx={{ p: 2, backgroundColor: 'rgba(79, 70, 229, 0.1)', borderRadius: 1, m: 1 }}>
        <Typography variant="caption" sx={{ color: '#4f46e5', fontWeight: 600 }}>
          Version 1.0
        </Typography>
      </Box>
    </Drawer>
  )
}

export { DRAWER_WIDTH }
export default Sidebar
