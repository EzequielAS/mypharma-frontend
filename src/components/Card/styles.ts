import styled from "styled-components"

export const Container = styled.div`
    width: 100%;
    padding: 0.5rem;
    background: var(--green900);
    color: var(--gray50);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
        font-weight: 500;
    }

    div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
    }
`