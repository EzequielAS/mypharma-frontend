import { useState } from "react"
import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"

import { Container } from './styles'


export function Panel() {
    const [isAsideOpen, setIsAsideOpen] = useState(false)

    return(
        <Container>
            <Header 

            />

            <Aside 
                isAsideOpen={isAsideOpen}
                setIsAsideOpen={setIsAsideOpen}
            />
        </Container>
    )
}