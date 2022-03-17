import { FaUserCircle } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Button } from "../Button"

import { Container, FirstSection, SecondSection } from "./styles"


export function Aside() {
    const { user, signOut } = useAuth()

    return (
        <Container isAsideOpen={false}>

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