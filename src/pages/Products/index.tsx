import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { Card } from "../../components/Card"
import { useProduct } from "../../services/hooks/useProduct"
import { SpaceLoader } from "../../components/SpaceLoader"

import { Container, Content } from './styles'

import { Button } from "../../components/Button"
import { queryClient } from "../../services/queryClient"
import { useMutation } from 'react-query'
import { api } from "../../services/api"
import { Product } from "../../services/hooks/useProduct"


export function Products() {
    const { data, isLoading } = useProduct()
    
    const search = useMutation(async (searchTerm: string) => {
        const response = await api.get(`product/getProducts/${searchTerm}`)

        const listFormatted = response.data.map((product: Product) => {
            return {
                ...product,
                price: new Intl.NumberFormat('pt-BR', 
                { 
                    style: 'currency', 
                    currency: 'BRL', 
                    maximumFractionDigits: 2 
                }).format(product.price)
            }
        })

        return listFormatted
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries('product')
        }
    })


    return(
        <Container>
            <Header />

            <Aside />

            <Button 
                text="goiaba"
                onClick={() => {
                    search.mutateAsync('w')
                }}
            />

            {
                isLoading 
                ? <SpaceLoader />
                :
                <Content>
                    {
                        data?.map(product => (
                            <Card 
                                key={product._id}
                                name={product.name}
                                informations={[
                                    `estoque: ${product.inventory}`,
                                    `preço: ${product.price}`,
                                    `marca: ${product.brand.name}`,
                                    `categoria: ${product.category.name}`
                                ]}
                            />
                        ))
                    }
                </Content>
            }
        </Container>
    )
}