import { ButtonHTMLAttributes, ReactNode } from "react"

import { ButtonElement } from './styles'

interface ButtonProps 
extends ButtonHTMLAttributes<HTMLButtonElement> { 
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
    text: ReactNode;
    isLoading?: boolean;
}

export function Button({ 
    borderRadius,
    padding, 
    fullWidth = false,
    text,
    isLoading,
    ...rest 
}: ButtonProps) {
    return (
        <ButtonElement
            borderRadius={borderRadius}
            padding={padding}
            isLoading={isLoading}
            fullWidth={fullWidth}
            {...rest}
        >
            {
                isLoading 
                ? <p>Loading...</p>
                : text 
            }
        </ButtonElement>
    )
}