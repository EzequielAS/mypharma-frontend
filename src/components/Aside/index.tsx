import { FaUserCircle, FaWindowClose } from "react-icons/fa"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { useCommonActions } from "../../context/CommonActionsContext"
import { Button } from "../Button"

import { Container, FirstSection, SecondSection } from "./styles"


export function Aside() {
    const { user, signOut } = useAuth()
    const { isAsideOpen, handleIsAsideOpen } = useCommonActions()

    return (
        <Container isAsideOpen={isAsideOpen}>

            <FaWindowClose 
                className="close"
                onClick={handleIsAsideOpen}
            />

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