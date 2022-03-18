import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { Aside } from "../../components/Aside"
import { Card } from "../../components/Card"
import { Product, useProduct } from "../../services/hooks/useProduct"
import { SpaceLoader } from "../../components/SpaceLoader"
import { SearchInput } from "../../components/Form/SearchInput"
import { queryClient } from "../../services/queryClient"
import { formatMoney } from "../../utils/formatMoney"
import { ModalProduct } from "./ModalProduct"
import { Button } from "../../components/Button"
import { useMutation } from "react-query"
import { api } from "../../services/api"
import { toast } from "react-toastify"

import { Container, Content, Actions } from './styles'

type ProductEdit = {
    _id: string;
    name: string;
    description: string;
    price: string;
    inventory: string;
    category: string;
    brand: string;
}

type ModalDatas = {
    isOpen: boolean,
    typeOfAction: string,
    datasToEdit?: ProductEdit
}

export function Products() {
    const [searchTerm, setSearchTerm] = useState('')
    const [modalDatas, setModalDatas] = useState<ModalDatas>({
        isOpen: false,
        typeOfAction: '',
    })
    const { data, isLoading } = useProduct()
    
    const { mutateAsync: mutateSearch, isLoading: searchLoad } = useMutation(async () => {
        if(searchTerm.trim() === '')
            return

        const response = await api.get(`product/getProducts/${searchTerm}`)

        return response.data
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('product', response)
            },
            onMutate: () => {
                const previousValue = queryClient.getQueryData('product')

                return previousValue
            },
            onError: (_, variables, previousValue) => {
                toast.error('Something went wrong')
                queryClient.setQueryData('product', previousValue)
            }
        }
    )
    
    const { mutateAsync: mutateDelete, isLoading: deleteLoad } = useMutation(async (_id: string) => {
        const previousProductList = queryClient.getQueryData<Product[]>('product')

        await api.delete(`product/deleteProduct/${_id}`)

        const nextProductList = previousProductList?.filter(product => product._id !== _id)

        return nextProductList
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('product', response)
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

    function handleOpenModalToEdit(object: ProductEdit) {
        setModalDatas({ 
            isOpen: true,
            typeOfAction: 'edit',
            datasToEdit: object
         })
    }

    useEffect(() => {
        if(searchTerm === '')
            queryClient.invalidateQueries('product')
    }, [searchTerm])

    
    return(
        <Container>
            <Header />

            <Aside />

            <SearchInput 
                handleSearch={mutateSearch}
                placeholder="search product"
                onChange={event => setSearchTerm(event.target.value)}
                value={searchTerm}
            />

            <Actions>
                <Button
                    text="Create New"
                    onClick={handleOpenModalToCreate}
                />
            </Actions>

            {
                isLoading || searchLoad
                ? <SpaceLoader />
                :
                <Content>
                    {
                        data?.map(product => (
                            <Card 
                                key={product._id}
                                name={product.name}
                                handleDelete={() => mutateDelete(product._id)}
                                handleEdit={() => 
                                    handleOpenModalToEdit({
                                        _id: product._id,
                                        brand: product.brand._id,
                                        category: product.category._id,
                                        description: product.description,
                                        inventory: String(product.inventory),
                                        name: product.name,
                                        price: String(product.price)
                                    })
                                }
                                isLoading={deleteLoad}
                                informations={[
                                    `estoque: ${product.inventory}`,
                                    `preço: ${formatMoney(product.price)}`,
                                    `marca: ${product.brand.name}`,
                                    `categoria: ${product.category.name}`,
                                    product.description ? `descrição: ${product.description}` : ''
                                ]}
                            />
                        ))
                    }
                </Content>
            }

            <ModalProduct 
                modalDatas={modalDatas}
                setModalDatas={setModalDatas}
            />
        </Container>
    )
}