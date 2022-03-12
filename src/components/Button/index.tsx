import { ButtonHTMLAttributes } from "react"

import { ButtonElement } from './styles'

interface ButtonProps 
extends ButtonHTMLAttributes<HTMLButtonElement> { 
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
    text: string;
}

export function Button({ 
    borderRadius,
    padding, 
    fullWidth = false,
    text,
    ...rest 
}: ButtonProps) {
    return (
        <ButtonElement
            borderRadius={borderRadius}
            padding={padding}
            fullWidth={fullWidth}
            {...rest}
        >
            { text }
        </ButtonElement>
    )
}