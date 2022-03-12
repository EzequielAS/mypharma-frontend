import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Global from './styles/global'
import Routes from './routes'

export function App() {
    return (
      <BrowserRouter>
        <Routes />
        <ToastContainer autoClose={4000} closeOnClick />
        <Global />
      </BrowserRouter>
    )
}
