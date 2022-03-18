import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Form/Input'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/api'
import { queryClient } from '../../../services/queryClient'

import { Content }  from './styles'

type CategoryForm = {
    name: string;
    description: string;
}

type ModalDatas = {
    typeOfAction: string;
    isOpen: boolean;
    datasToEdit?: {
        _id: string;
        name: string,
        description: string
    }
}

interface ModalCategoryProps {
    modalDatas: ModalDatas
    setModalDatas: (value: ModalDatas) => void;
}

export function ModalCategory({ modalDatas, setModalDatas, }: ModalCategoryProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [isLoading, seIsLoading] = useState(false)

    function closeModal() {
        setModalDatas({
            isOpen: false,
            typeOfAction: '',
            datasToEdit: {
                _id: '',
                name: '',
                description: ''
            }
        })
    }

    async function createCategory(object: CategoryForm) {
        seIsLoading(true)

        await api.post('category/createCategory', object)
            .then(() => {
                queryClient.invalidateQueries('category')

                seIsLoading(false)

                closeModal()

                toast.success('Category created successfully')
            })
            .catch(error => {
                toast.error(error)
                seIsLoading(false)
            })
    }

    async function updateCategory(object: CategoryForm) {
        seIsLoading(true)

        const objectToEdit = {
            ...object,
            _id: modalDatas.datasToEdit?._id
        }

        await api.patch('category/updateCategory', objectToEdit)
            .then(() => {
                queryClient.invalidateQueries('category')

                seIsLoading(false)

                closeModal()

                toast.success('Category updated successfully')
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

        const categoryObject = {
            name,
            description
        }

        if(modalDatas.typeOfAction === 'create') {
            createCategory(categoryObject)

            return
        }

        updateCategory(categoryObject)
    }

    useEffect(() => {
        if(modalDatas.datasToEdit) {
            setName(modalDatas.datasToEdit.name)
            setDescription(modalDatas.datasToEdit?.description)
        }
    }, [modalDatas])

    
    return (
        <Modal 
            title="Category"
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

                <Input 
                    placeholder='Description'
                    fullWidth={true}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
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