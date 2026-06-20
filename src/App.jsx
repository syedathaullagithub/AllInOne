import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRoutes } from './routes'

function App() {
  return (
    <BrowserRouter basename="/AllInOne/">
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
