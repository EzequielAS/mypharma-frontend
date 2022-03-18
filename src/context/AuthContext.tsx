import { createContext, ReactNode, useState, useContext, useCallback } from "react"
import { api } from "../services/api"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

type SignInCredentials = {
    email: string;
    password: string;
}

type SignUpData = {
    name: string;
    email: string;
    password: string;
}

type AuthContextData = {
    signIn: (credentials: SignInCredentials) => Promise<void>;
    signUp: (data: SignUpData) => Promise<void>;
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
            toast.error('Check your data')
        }
     }, [navigate])

    const signUp = useCallback(async ({ email, name, password }: SignUpData) => {
        if(email.trim() === '' || name.trim() === ''|| password.trim() === '') {
            toast.error('Fill in the data')

            return
        }

        try{
            const response = await api.post('user/register', {
                email,
                password,
                name
            })

            const userEmail = response.data.email

            sessionStorage.setItem('@MyPharma:email', userEmail)

            setUser(userEmail)

            navigate('/categories')
       } catch(err) {
           toast.error('Something went wrong')
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
                signUp,
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