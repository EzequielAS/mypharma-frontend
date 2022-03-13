import styled from 'styled-components'

type InputProps = { 
    borderRadius?: string;
    padding?: string;
    fullWidth?: boolean;
}

export const InputElement = styled.input<InputProps>`
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
    color: var(--gray50);
    font-size: 1rem;
    font-weight: 900;

    &:focus {
        border: 2px solid var(--green900)
    }

    &[type='password'] {
        &::-ms-reveal {
            display: none;
        }
    }
`