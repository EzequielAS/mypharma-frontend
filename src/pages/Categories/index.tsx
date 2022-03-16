import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { api } from "../../services/api"
import { toast } from "react-toastify"
import { Card } from "../../components/Card"

import { Container, Content } from './styles'


type Category = {
    _id: string;
    name: string;
}

export function Categories() {
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        api.get('category/getCategories')
            .then(response => setCategories(response.data))
            .catch(error => toast.error(error))
    }, [])

    
    return(
        <Container>
            <Header />

            <Aside />

            <Content>
                {
                    categories.map(category => (
                        <Card 
                            key={category._id}
                            name={category.name}
                        />
                    ))
                }
            </Content>
        </Container>
    )
}