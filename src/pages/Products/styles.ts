import styled from "styled-components"


export const Container = styled.section`
    width: 100%;
`
export const Content = styled.div`
    width: 95%;
    max-width: 1200px;
    margin: 0 auto auto 2rem;
`
export const Actions = styled.section`
    width: 95%;
    max-width: 1200px;
    margin: 5rem auto 2rem auto;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    button {
        font-size: 0.9rem;
        width: 9rem;
        padding: 0.5rem;
    }
`