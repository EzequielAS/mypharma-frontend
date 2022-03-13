import { FormEvent, useState } from 'react'
import { Input } from '../../components/Input'
import { Logo } from '../../components/Logo'
import { Button } from '../../components/Button'
import { useAuth } from '../../context/AuthContext'

import { Container, Content } from './styles'


export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signIn } = useAuth()

    function onSubmit(event: FormEvent) {
        event.preventDefault()

        signIn({email, password})

        setEmail('')
        setPassword('')
    }
    

    return(
        <Container>

            <Content onSubmit={onSubmit}>
                <Logo />
        
                <Input 
                    fullWidth={true}
                    placeholder="Email"
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    fullWidth={true}
                    placeholder="Password"
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                />

                <Button 
                    text="LOGIN"
                    type="submit"
                />
            </Content>

        </Container>
    )
}