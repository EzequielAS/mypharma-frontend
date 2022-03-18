import { SelectHTMLAttributes } from 'react'

import { Container } from './styles'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
}

export function SelectInput({ 
    borderRadius,
    padding,
    fullWidth,
    isLoading, 
    ...rest 
}: SelectProps) {
    return (
        <Container 
            borderRadius={borderRadius}
            padding={padding}
            fullWidth={fullWidth}
            isLoading={isLoading}
            {...rest} 
        />
    )
}