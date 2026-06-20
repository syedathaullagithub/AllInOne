import DashboardPage from '../pages/DashboardPage'
import BooksPage from '../pages/BooksPage'
import AuthorsPage from '../pages/AuthorsPage'
import SettingsPage from '../pages/SettingsPage'

export const routes = [
  {
    path: '/dashboard',
    element: <DashboardPage />,
    label: 'Dashboard',
  },
  {
    path: '/books',
    element: <BooksPage />,
    label: 'Books',
  },
  {
    path: '/authors',
    element: <AuthorsPage />,
    label: 'Authors',
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    label: 'Settings',
  },
]
