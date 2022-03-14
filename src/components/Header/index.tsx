import { Logo } from '../Logo'
import { FaBars } from 'react-icons/fa'

import { Container, Content } from './styles'


export function Header() {

    return (
        <Container>

            <Content>
                <Logo />

                <FaBars />
            </Content>

        </Container>
    )
}