import { FormEvent, useState } from "react"
import { FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Button } from "../../components/Button"
import { Input } from "../../components/Form/Input"
import { Logo } from "../../components/Logo"
import { useAuth } from "../../context/AuthContext"

import { Container, Content, BackToLoginButton } from "./styles"


export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { signUp } = useAuth()

    async function handleRegisterUser(event: FormEvent) {
        event.preventDefault()
        setIsLoading(true)

        await signUp({ name, email, password })
        
        setIsLoading(false)
        setName('')
        setEmail('')
        setPassword('')
    }


    return (
        <Container>
            <Content onSubmit={handleRegisterUser}>
                <Logo />

                <Input
                    placeholder="Name"
                    fullWidth={true} 
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <Input
                    placeholder="Email"
                    fullWidth={true} 
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <Input 
                    placeholder="Password"
                    type="password"
                    fullWidth={true} 
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
        
                <BackToLoginButton>
                    <FaArrowLeft />

                    <Link to="/">
                        Back to login
                    </Link>
                </BackToLoginButton>

                <Button
                    text="REGISTER"
                    type="submit"
                    isLoading={isLoading}
                />
            </Content>

        </Container>
    )
}