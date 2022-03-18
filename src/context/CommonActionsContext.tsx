import { createContext, ReactNode, useState, useContext, useCallback, useEffect } from "react"
import { useAuth } from "./AuthContext"


type CommonActionsContextData = {
    isAsideOpen: boolean;
    handleIsAsideOpen: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const CommonActionsContext = createContext({} as CommonActionsContextData)


export function CommonActionsProvider({ children }: AuthProviderProps) {
    const [isAsideOpen, setIsAsideOpen] = useState(false)
    const { isAuthenticated } = useAuth()

    const handleIsAsideOpen = useCallback(() => {
        setIsAsideOpen(state => !state)
    }, [])

    useEffect(() => {
        if(!isAuthenticated) 
            setIsAsideOpen(false)
    }, [isAuthenticated])
    
    return(
        <CommonActionsContext.Provider value={{ 
               isAsideOpen,
               handleIsAsideOpen
            }}
        >
            {children}
        </CommonActionsContext.Provider>
    )
}

export function useCommonActions() {
    const context = useContext(CommonActionsContext);

    if(!context) {
        throw new Error('useCommonActions must be used within an Provider');
    }

    return context;
}