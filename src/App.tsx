import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import Global from './styles/global'
import Routes from './routes'

export function App() {
    return (
      <BrowserRouter>
      
        <AuthProvider>
          <Routes />
        </AuthProvider>

        <ToastContainer autoClose={4000} closeOnClick />
        <Global />
      </BrowserRouter>
    )
}
