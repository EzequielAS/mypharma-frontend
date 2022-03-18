import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Form/Input'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/api'
import { queryClient } from '../../../services/queryClient'

import { Content }  from './styles'

type BrandForm = {
    name: string;
}

type ModalDatas = {
    typeOfAction: string;
    isOpen: boolean;
    datasToEdit?: {
        _id: string;
        name: string,
    }
}

interface ModalBrandProps {
    modalDatas: ModalDatas
    setModalDatas: (value: ModalDatas) => void;
}

export function ModalBrand({ modalDatas, setModalDatas, }: ModalBrandProps) {
    const [name, setName] = useState('')
    const [isLoading, seIsLoading] = useState(false)

    function closeModal() {
        setModalDatas({
            isOpen: false,
            typeOfAction: '',
            datasToEdit: {
                _id: '',
                name: '',
            }
        })
    }

    async function createBrand(object: BrandForm) {
        seIsLoading(true)

        await api.post('brand/createBrand', object)
            .then(() => {
                queryClient.invalidateQueries('brand')

                seIsLoading(false)

                closeModal()

                toast.success('Brand created successfully')
            })
            .catch(error => {
                toast.error(error)
                seIsLoading(false)
            })
    }

    async function updateBrand(object: BrandForm) {
        seIsLoading(true)

        const objectToEdit = {
            ...object,
            _id: modalDatas.datasToEdit?._id
        }

        await api.patch('brand/updateBrand', objectToEdit)
            .then(() => {
                queryClient.invalidateQueries('brand')

                seIsLoading(false)

                closeModal()

                toast.success('Brand updated successfully')
            })
            .catch(error => {
                toast.error(error)
                seIsLoading(false)
            })
    }

    function handleSendForm(event: FormEvent) {
        event.preventDefault()

        if(name.trim() === '') {
            toast.error('Name is required')

            return
        }

        const categoryObject = { name }

        if(modalDatas.typeOfAction === 'create') {
            createBrand(categoryObject)

            return
        }

        updateBrand(categoryObject)
    }

    useEffect(() => {
        if(modalDatas.datasToEdit) {
            setName(modalDatas.datasToEdit.name)
        }
    }, [modalDatas])

    
    return (
        <Modal 
            title="Brand"
            isOpen={modalDatas.isOpen}
            closeButtonAction={closeModal}
        >
            <Content onSubmit={handleSendForm}>
                <Input 
                    placeholder='Name'
                    fullWidth={true}
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

                <Button 
                    text="Submit"
                    type="submit"
                    fullWidth={true}
                    isLoading={isLoading}
                />
            </Content>
        </Modal>
    )
}