import { Aside } from '../../components/Aside'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { SpaceLoader } from '../../components/SpaceLoader'
import { useBrand } from '../../services/hooks/useBrand'

import { Container, Content } from './styles'

 
export function Brands() {
    const { data, isLoading } = useBrand()
    
    return (
        <Container>
            <Header />

            <Aside />

            {
                isLoading 
                ? <SpaceLoader />
                :
                <Content>
                    {
                        data?.map(brand => (
                            <Card
                                key={brand._id}
                                name={brand.name}
                            />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}