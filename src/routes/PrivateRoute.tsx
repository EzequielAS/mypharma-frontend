import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuth } from '../context/AuthContext'

interface PrivateRouteProps {
    component: ComponentType
}

export const PrivateRoute = ({ component: Component }: PrivateRouteProps) => {
    const { user } = useAuth()

    if (!user) {
      return <Navigate to="/" replace />
    }
  
    return <Component />
}
