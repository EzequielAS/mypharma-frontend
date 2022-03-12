import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    width: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
`

export const Content = styled.div`
    width: 95%;
    max-width: 600px;
    padding: 2rem;
    border-radius: 10px;
    background: var(--gray800);

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;
`