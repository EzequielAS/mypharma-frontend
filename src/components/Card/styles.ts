import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 0.5rem;
    background: var(--green900);
    color: var(--gray50);
    border-radius: 5px;

    & + & {
        margin-top: 1rem;
    }
`

export const Main = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-weight: 500;
        font-size: 1.4rem;
        font-weight: 900;
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
    }
`

export const Informations = styled.div`
    border-top: 3px solid var(--gray100);
    margin-top: 1rem;
    padding: 0.5rem;
    background: var(--green400);

    p + p{
        margin-top: 0.5rem;
    }
`