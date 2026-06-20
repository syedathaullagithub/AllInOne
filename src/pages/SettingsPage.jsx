import { Box, Typography, Card, CardContent, FormControlLabel, Switch, Alert } from '@mui/material'
import { useState } from 'react'

function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoSave, setAutoSave] = useState(true)

  return (
    <Box>
      <Typography variant="h3" sx={{ mb: 4, fontWeight: 'bold' }}>
        ⚙️ Settings
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        Configure your application preferences
      </Alert>

      <Box sx={{ maxWidth: 600 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Display Settings
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />}
                label="Dark Mode (Coming soon)"
                disabled
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Notifications
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControlLabel
                control={<Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />}
                label="Enable Notifications"
              />
              <FormControlLabel
                control={<Switch checked={autoSave} onChange={(e) => setAutoSave(e.target.checked)} />}
                label="Auto-save Changes"
              />
            </Box>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              About
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Application Version
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  1.0.0
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="textSecondary">
                  Built with
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  React, Redux, Material-UI, React Router
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default SettingsPage
