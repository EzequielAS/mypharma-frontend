import styled, { css } from "styled-components"

type SelectProps = { 
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
    isLoading?: boolean;
}

export const Container = styled.select<SelectProps>`
    background: var(--gray900);
    border: 2px solid transparent;
    position: relative;
    border-radius: ${({ borderRadius }) => 
        borderRadius 
        ? `${borderRadius}px`
        : '5px'
    };

    padding: ${({ padding }) => 
        padding 
        ? `${padding}rem`
        : '0.5rem'
    };
    width: ${({ fullWidth }) =>
        fullWidth 
        ? '100%'
        : '15rem'
    };
    color: var(--gray500);
    font-size: 1rem;
    font-weight: 900;

    ${({ isLoading }) => isLoading && css`
        pointer-events: none;
        opacity: 0.5;
    `}
`