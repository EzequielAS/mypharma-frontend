import { InputHTMLAttributes } from 'react'
import { InputElement } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
}

export function Input({ 
    borderRadius, 
    padding,
    fullWidth = false,
    ...rest 
}: InputProps) {
    return (
        <InputElement 
            borderRadius={borderRadius}
            padding={padding}
            fullWidth={fullWidth}
            {...rest}
        />
    )
}