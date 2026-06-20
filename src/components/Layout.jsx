import { Box, Container } from '@mui/material'
import Sidebar from './Sidebar'

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
    </Box>
  )
}

export default Layout
