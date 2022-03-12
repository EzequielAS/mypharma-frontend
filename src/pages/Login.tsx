import { Input } from '../components/Input'
import { Logo } from '../components/Logo'
import { Button } from '../components/Button'

import { Container, Content } from './styles'


export function Login() {
    return(
        <Container>

            <Content>
                <Logo />

                <Input 
                    fullWidth={true}
                    placeholder="Email"
                    type="email"
                />
                <Input 
                    fullWidth={true}
                    placeholder="Password"
                    type="password"
                />

                <Button 
                    text="LOGIN"
                />
            </Content>

        </Container>
    )
}