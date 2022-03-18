import { FormEvent, useEffect, useState } from 'react'
import { Input } from '../../components/Form/Input'
import { Logo } from '../../components/Logo'
import { Button } from '../../components/Button'
import { useAuth } from '../../context/AuthContext'
import { FaArrowRight } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

import { Container, Content, RegisterButton } from './styles'


export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    const { signIn, isAuthenticated } = useAuth()

    async function onSubmit(event: FormEvent) {
        event.preventDefault()
        setIsLoading(true)
        
        await signIn({email, password})

        setIsLoading(false)
        setEmail('')
        setPassword('')
    }
    
    useEffect(() => {
        if(isAuthenticated)
            navigate('/categories')
    }, [navigate, isAuthenticated])

    

    return(
        <Container>

            <Content onSubmit={onSubmit}>
                <Logo />
        
                <Input 
                    fullWidth={true}
                    placeholder="Email"
                    type="text"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <Input 
                    fullWidth={true}
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />

                <RegisterButton>
                    <Link to="/register">
                        Register now
                    </Link>

                    <FaArrowRight />
                </RegisterButton>

                <Button 
                    text="LOGIN"
                    type="submit"
                    isLoading={isLoading}
                />
            </Content>

        </Container>
    )
}