import styled from "styled-components"

export const Container = styled.div`
    height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`
export const Content = styled.form`
    width: 95%;
    max-width: 600px;
    padding: 2rem;
    border-radius: 10px;
    background: var(--gray800);
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`
export const BackToLoginButton = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: var(--green900);

    position: absolute;
    top: 10px;
    left: 10px;

    font-size: 0.7rem;
    font-weight: 900;

    svg {
        font-size: 0.8rem;
    }
`