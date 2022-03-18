import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { Card } from "../../components/Card"
import { Button } from "../../components/Button"
import { SpaceLoader } from "../../components/SpaceLoader"
import { SearchInput } from "../../components/Form/SearchInput"
import { Category, useCategory } from "../../services/hooks/useCategory"
import { queryClient } from "../../services/queryClient"
import { ModalCategory } from "./ModalCategory"
import { api } from "../../services/api"
import { useMutation } from "react-query"
import { toast } from "react-toastify"

import { Container, Content, Actions } from './styles'

type CategoryEdit = {
    _id: string;
    name: string;
    description: string;
}

type ModalDatas = {
    isOpen: boolean,
    typeOfAction: string,
    datasToEdit?: CategoryEdit
}

export function Categories() {
    const [searchTerm, setSearchTerm] = useState('')
    const [modalDatas, setModalDatas] = useState<ModalDatas>({
        isOpen: false,
        typeOfAction: '',
    })
    const { data, isLoading } = useCategory()

    const { mutateAsync: mutateSearch, isLoading: searchLoad } = useMutation(async () => {
        if(searchTerm.trim() === '')
            return

        const response = await api.get(`category/getCategories/${searchTerm}`)

        return response.data
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('category', response)
            },
            onMutate: () => {
                const previousValue = queryClient.getQueryData('category')

                return previousValue
            },
            onError: (_, variables, previousValue) => {
                toast.error('Something went wrong')
                queryClient.setQueryData('category', previousValue)
            }
        }
    )
    
    const { mutateAsync: mutateDelete, isLoading: deleteLoad } = useMutation(async (_id: string) => {
        const previousCategoryList = queryClient.getQueryData<Category[]>('category')

        await api.delete(`category/deleteCategory/${_id}`)

        const nextCategoryList = previousCategoryList?.filter(category => category._id !== _id)

        return nextCategoryList
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('category', response)
            },
            onError: (_, variables, previousValue) => {
                toast.error('Something went wrong')
            }
        }
    )

    function handleOpenModalToCreate() {
        setModalDatas({ 
            isOpen: true,
            typeOfAction: 'create'
         })
    }

    function handleOpenModalToEdit(object: CategoryEdit) {
        setModalDatas({ 
            isOpen: true,
            typeOfAction: 'edit',
            datasToEdit: object
         })
    }

    useEffect(() => {
        if(searchTerm === '')
            queryClient.invalidateQueries('category')
    }, [searchTerm])

    
    return(
        <Container>
            <Header />

            <Aside />

            
            <SearchInput 
                handleSearch={mutateSearch}
                placeholder="search category"
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
            />

            <Actions>
                <Button
                    text="Create New"
                    className="create"
                    onClick={handleOpenModalToCreate}
                />
            </Actions>
      

            {
                isLoading || searchLoad
                ? <SpaceLoader />
                :
                <Content>
                    {
                        data?.map(category => (
                            <Card 
                                key={category._id}
                                name={category.name}
                                handleDelete={() => mutateDelete(category._id)}
                                handleEdit={() => 
                                    handleOpenModalToEdit({
                                        _id: category._id,
                                        name: category.name, 
                                        description: category.description
                                    })
                                }
                                isLoading={deleteLoad}
                                informations={[
                                    category.description 
                                    ? `descrição: ${category.description}` 
                                    : '',
                                ]}
                            />
                        ))
                    }
                </Content>
            }

            <ModalCategory 
                modalDatas={modalDatas}
                setModalDatas={setModalDatas}
            />
        </Container>
    )
}