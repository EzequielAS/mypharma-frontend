import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { Card } from "../../components/Card"
import { useCategory } from "../../services/hooks/useCategory"
import { SpaceLoader } from "../../components/SpaceLoader"

import { Container, Content } from './styles'


export function Categories() {
    const { data, isLoading } = useCategory()


    return(
        <Container>
            <Header />

            <Aside />


            {
                isLoading 
                ? <SpaceLoader />
                :
                <Content>
                    {
                        data?.map(category => (
                            <Card 
                                key={category._id}
                                name={category.name}
                                informations={[
                                    `descrição: ${category.description}`
                                ]}
                            />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}