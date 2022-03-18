import styled from "styled-components"

type ContainerProps = {
    isAsideOpen: boolean;
}

export const Container = styled.aside<ContainerProps>`
    position: fixed;
    top: 0;
    right: 0;
    z-index: 99;

    width: 100%;
    height: 100%;
    max-width: 400px;
    padding: 0.5rem;
    background: var(--gray800);
    transform: ${({ isAsideOpen }) => 
        isAsideOpen 
        ? 'translateX(0)'
        : 'translateX(100%)'
    };
    transition: transform 0.3s;

    display: flex;
    flex-direction: column;

    .logout {
        font-size: 0.9rem;
        margin: 0.5rem auto;
        padding: 0.5rem;
        width: 10rem;
    }

    .close {
        font-size: 1.3rem;
        color: var(--gray500);
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
    }
`

export const FirstSection = styled.section`
    width: 100%;
    padding: 3rem 0;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    svg {
        font-size: 3.5rem;
    }

    p {
        color: var(--gray500);
        font-size: 0.8rem;
    }
`

export const SecondSection = styled.section`
    width: 100%;
    flex: auto;

    div {
        width: 100%;
        text-align: center;
        padding: 1rem;

        border-top: 1px solid var(--gray600);
        border-bottom: 1px solid var(--gray600);

        & + div {
            border-top: none;
        }
    }
`