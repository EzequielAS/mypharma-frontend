import styled, { css } from "styled-components"

type ContainerProps = {
    isOpen: boolean;
}

export const Container = styled.div<ContainerProps>`
    position: fixed;
    top: 0;
    right: 0;

    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    z-index: -9;
    opacity: 0;
    transition: opacity 0.3s ease, z-index 0.3s ease-in-out;

    display: flex;
    align-items: center;
    justify-content: center;

    ${({ isOpen }) => isOpen && css`
        z-index: 99;
        opacity: 1;
    `}
`

export const Content = styled.div`
    background: var(--gray800);
    padding: 3rem;
    border-radius: 10px;
    width: 95%;
    max-width: 600px;
    position: relative;

    display: flex;
    flex-direction: column;
    gap: 1.2rem;

    strong {
        font-size: 1.8rem;
    }

    svg {
        position: absolute;
        top: 15px;
        right: 15px;
        font-size: 1.2rem;
        color: var(--gray500);
        cursor: pointer;
    }

    @media (max-width: 500px) {
        padding: 2rem;
    }
`
