import { Logo } from '../Logo'
import { FaBars } from 'react-icons/fa'
import { useCommonActions } from '../../context/CommonActionsContext'

import { Container, Content } from './styles'


export function Header() {
    const { handleIsAsideOpen } = useCommonActions()

    return (
        <Container>

            <Content>
                <Logo />

                <FaBars 
                    onClick={handleIsAsideOpen}
                />
            </Content>

        </Container>
    )
}