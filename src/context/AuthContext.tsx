import { createContext, ReactNode, useState, useContext, useCallback } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type SignInCredentials = {
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signOut: () => void;
    isAuthenticated: boolean;
    user: string | null;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState(sessionStorage.getItem('@MyPharma:email'))
    const navigate = useNavigate()
    const isAuthenticated = !!user

    const signIn = useCallback( async ({ email, password }: SignInCredentials) => {
        try{
             const response = await api.post('user/login', {
                 email,
                 password
             })
 
             const userEmail = response.data.email
 
             sessionStorage.setItem('@MyPharma:email', userEmail)
 
             setUser(userEmail)
 
             navigate('/categories')
        } catch(err) {
            toast.error('Verify your datas')
        }
     }, [navigate])
 
     const signOut = useCallback(() => {
        sessionStorage.clear()
        setUser(null)
    
        navigate('/')
     }, [navigate])

    
    return(
        <AuthContext.Provider value={{ 
                isAuthenticated, 
                signIn, 
                signOut, 
                user
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}