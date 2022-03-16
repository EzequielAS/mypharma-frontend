import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from './context/AuthContext'
import { QueryClientProvider } from "react-query"
import { queryClient } from './services/queryClient'
import Global from './styles/global'
import Routes from './routes'


export function App() {
    return (
      <BrowserRouter>
        
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
      
        <ToastContainer 
          autoClose={4000} 
          closeOnClick 
          theme='colored'
        />
        
        <Global />
      </BrowserRouter>
    )
}
