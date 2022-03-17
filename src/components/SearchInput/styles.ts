import styled from "styled-components"

export const Container = styled.form`
    background: var(--gray800);
    display: flex;
    align-items: center;
    padding: 1rem;
    border-radius: 10px;
    width: 20rem;
    margin: 2rem auto;

    input {
        flex: auto;
        height: 100%;
        background: transparent;
        border: none;
        color: var(--gray50);
    }

    button {
        border: none;
        background: none;
        color: var(--gray50);
    }

    input::-webkit-input-placeholder  { 
        color: var(--gray400); 
    }
    input:-moz-placeholder { 
        color: var(--gray400); 
    }
`