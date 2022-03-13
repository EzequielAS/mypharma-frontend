import { createContext, ReactNode, useEffect, useState, useContext, useCallback } from "react"
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
    user: string | undefined;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState()
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
 
             navigate('/panel')
        } catch(err) {
            toast.error('Verify your datas')
        }
     }, [navigate])
 
     const signOut = useCallback(() => {
         sessionStorage.clear()
     
         navigate('/')
     }, [navigate])


    useEffect(() => {
        const session = sessionStorage.getItem('@MyPharma:email')

        if (session) {
            api.get(`user/me/${session}`).then(response => {
                const userEmail = response.data.email

                setUser(userEmail)
            })
            .catch(() => {
                signOut()
            })
        }
    }, [signOut])

    
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