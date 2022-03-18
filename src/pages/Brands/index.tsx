import { useEffect, useState } from 'react'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { Aside } from '../../components/Aside'
import { Button } from '../../components/Button'
import { Card } from '../../components/Card'
import { Header } from '../../components/Header'
import { SearchInput } from '../../components/Form/SearchInput'
import { SpaceLoader } from '../../components/SpaceLoader'
import { api } from '../../services/api'
import { Brand, useBrand } from '../../services/hooks/useBrand'
import { queryClient } from '../../services/queryClient'
import { ModalBrand } from './ModalBrand'

import { Container, Content, Actions } from './styles'

type BrandEdit = {
    _id: string;
    name: string;
}

type ModalDatas = {
    isOpen: boolean,
    typeOfAction: string,
    datasToEdit?: BrandEdit
}
 
export function Brands() {
    const [searchTerm, setSearchTerm] = useState('')
    const [modalDatas, setModalDatas] = useState<ModalDatas>({
        isOpen: false,
        typeOfAction: '',
    })
    const { data, isLoading } = useBrand()

    const { mutateAsync: mutateSearch, isLoading: searchLoad } = useMutation(async () => {
        if(searchTerm.trim() === '')
            return

        const response = await api.get(`brand/getBrands/${searchTerm}`)

        return response.data
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('brand', response)
            },
            onError: () => {
                toast.error('Something went wrong')
            }
        }
    )
    
    const { mutateAsync: mutateDelete, isLoading: deleteLoad } = useMutation(async (_id: string) => {
        const previousBrandList = queryClient.getQueryData<Brand[]>('brand')

        await api.delete(`brand/deleteBrand/${_id}`)

        const nextBrandList = previousBrandList?.filter(brand => brand._id !== _id)

        return nextBrandList
    }, 
        {
            onSuccess: (response) => {
                queryClient.setQueryData('brand', response)
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

    function handleOpenModalToEdit(object: BrandEdit) {
        setModalDatas({ 
            isOpen: true,
            typeOfAction: 'edit',
            datasToEdit: object
         })
    }

    useEffect(() => {
        if(searchTerm === '')
            queryClient.invalidateQueries('brand')
    }, [searchTerm])


    return (
        <Container>
            <Header />

            <Aside />

            <SearchInput 
                handleSearch={mutateSearch}
                placeholder="search brand"
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
                        data?.map(brand => (
                            <Card
                                key={brand._id}
                                name={brand.name}
                                handleDelete={() => mutateDelete(brand._id)}
                                handleEdit={() => 
                                    handleOpenModalToEdit({
                                        _id: brand._id,
                                        name: brand.name
                                    })
                                }
                                isLoading={deleteLoad}
                            />
                        ))
                    }
                </Content>
            }

            <ModalBrand 
                modalDatas={modalDatas}
                setModalDatas={setModalDatas}
            />
        </Container>
    )
}