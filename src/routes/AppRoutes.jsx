import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from '../components/Layout'
import { routes } from './routeConfig'

function AppRoutes() {
  return (
    <Routes>
      {routes.map(route => (
        <Route
          key={route.path}
          path={route.path}
          element={<Layout>{route.element}</Layout>}
        />
      ))}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export default AppRoutes
