import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../Button"

import { Container, FirstSection, SecondSection } from "./styles"

interface AsideProps {
    isAsideOpen: boolean;
    setIsAsideOpen: (value: boolean) => void;
}

export function Aside({ isAsideOpen, setIsAsideOpen }: AsideProps) {
    const { user, signOut } = useAuth()

    return (
        <Container isAsideOpen={true}>

            <FirstSection>
                <FaUserCircle />
                <p>{user}</p>
            </FirstSection>

            <SecondSection>

                <div>
                    <Link to="/categories">
                        <p>Categories</p>
                    </Link>
                </div>

                <div>
                    <Link to="/brands">
                        <p>Brands</p>
                    </Link>
                </div>

                <div>
                    <Link to="/products">
                        <p>Products</p>
                    </Link>
                </div>

            </SecondSection>


            <Button 
                text="Logout"
                onClick={signOut}
                className="logout"
            />
        </Container>
    )
}