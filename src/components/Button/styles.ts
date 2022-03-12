import styled from 'styled-components'

type ButtonProps = { 
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
}

export const ButtonElement = styled.button<ButtonProps>`
    background: var(--green900);
    border: none;
    border-radius: ${({ borderRadius }) => 
        borderRadius 
        ? `${borderRadius}px`
        : '5px'
    };

    padding: ${({ padding }) => 
        padding 
        ? `${padding}rem`
        : '0.7rem'
    };
    width: ${({ fullWidth }) =>
        fullWidth 
        ? '100%'
        : '12rem'
    };
    color: var(--gray50);
    font-size: 1rem;
    font-weight: 900;
    transition: filter 0.3s;

    &:hover {
        filter: brightness(0.9);
    }
`