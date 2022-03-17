import { useState } from "react"
import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { Card } from "../../components/Card"
import { SearchInput } from "../../components/SearchInput"
import { useCategory } from "../../services/hooks/useCategory"
import { SpaceLoader } from "../../components/SpaceLoader"
import { api } from "../../services/api"
import { queryClient } from "../../services/queryClient"
import { useMutation } from "react-query"

import { Container, Content } from './styles'


export function Categories() {
    const [searchTerm, setSearchTerm] = useState('')
    const { data, isLoading, isRefetching } = useCategory()

    async function search() {
        if(searchTerm.trim() === '')
            return

        const response = await api.get(`category/getCategories/${searchTerm}`)

        queryClient.setQueryData('category', response.data)
    }

    const createUser = useMutation(async () => {
        if(searchTerm.trim() === '')
        return

        const response = await api.get(`category/getCategories/${searchTerm}`)

        return response.data
    }, 
        {
            onMutate: () => {
                setSearchTerm('')
    
                const previousValue = queryClient.getQueryData('todos')
        
                queryClient.setQueryData('todos', old => ({
                    ...old,
                    items: [...old.items, text],
                }))
        
                return previousValue
            },
            onSuccess: () => {
                queryClient.invalidateQueries('users')
            }
        }
    )

    const addTodoMutation = useMutation(
        text => axios.post('/api/data', { text }),
      ,
          // On failure, roll back to the previous value
          onError: (err, variables, previousValue) =>
            queryClient.setQueryData('todos', previousValue),
          // After success or failure, refetch the todos query
          onSettled: () => {
            queryClient.invalidateQueries('todos')
          },
        }
      )

    return(
        <Container>
            <Header />

            <Aside />

            <SearchInput 
                handleSearch={search}
                placeholder="search in platform"
                onChange={event => setSearchTerm(event.target.value)}
            />

            {
                isLoading || isRefetching
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