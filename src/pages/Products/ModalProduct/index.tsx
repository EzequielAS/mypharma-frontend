import { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Form/Input'
import { SelectInput } from '../../../components/Form/SelectInput'
import { Modal } from '../../../components/Modal'
import { api } from '../../../services/api'
import { useBrand } from '../../../services/hooks/useBrand'
import { useCategory } from '../../../services/hooks/useCategory'
import { queryClient } from '../../../services/queryClient'

import { Content }  from './styles'

type ProductForm = {
    name: string;
    description: string;
    price: number;
    inventory: number;
    category: string;
    brand: string;
}

type ModalDatas = {
    typeOfAction: string;
    isOpen: boolean;
    datasToEdit?: {
        _id: string;
        name: string;
        description: string;
        price: string;
        inventory: string;
        category: string;
        brand: string;
    }
}

interface ModalProductProps {
    modalDatas: ModalDatas
    setModalDatas: (value: ModalDatas) => void;
}

export function ModalProduct({ modalDatas, setModalDatas, }: ModalProductProps) {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [inventory, setInventory] = useState('')
    const [category, setCategory] = useState('')
    const [brand, setBrand] = useState('')
    const [isLoading, seIsLoading] = useState(false)

    const { 
        data: categories, 
        isLoading: loadCategory 
    } = useCategory()

    const { 
        data: brands, 
        isLoading: loadBrand 
    } = useBrand()

    function closeModal() {
        setModalDatas({
            isOpen: false,
            typeOfAction: '',
            datasToEdit: {
                _id: '',
                name: '',
                description: '',
                price: '',
                inventory: '',
                category: '',
                brand: '',
            }
        })

        setBrand('')
        setCategory('')
    }

    async function createProduct(object: ProductForm) {
        seIsLoading(true)

        await api.post('product/createProduct', object)
            .then(() => {
                queryClient.invalidateQueries('product')

                seIsLoading(false)

                closeModal()

                toast.success('Product created successfully')
            })
            .catch(error => {
                toast.error(error)
                seIsLoading(false)
            })
    }

    async function updateProduct(object: ProductForm) {
        seIsLoading(true)

        const objectToEdit = {
            ...object,
            _id: modalDatas.datasToEdit?._id
        }

        await api.patch('product/updateProduct', objectToEdit)
            .then(() => {
                queryClient.invalidateQueries('product')

                seIsLoading(false)

                closeModal()

                toast.success('Product updated successfully')
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

        if(category === '') {
            toast.error('Category is required')
            return
        }

        if(brand === '') {
            toast.error('Brand is required')
            return
        }

        if(!Number(price)) {
            seIsLoading(false)

            toast.error('Price must be a number')

            return
        }

        if(!Number(inventory)) {
            seIsLoading(false)

            toast.error('Inventory must be a number')

            return
        }

        const priceFormatted = Number(price)
        const inventoryFormatted = Number(inventory)

        const categoryObject = {
            name,
            description,
            price: priceFormatted,
            inventory: inventoryFormatted,
            category,
            brand
        }

        if(modalDatas.typeOfAction === 'create') {
            createProduct(categoryObject)

            return
        }

        updateProduct(categoryObject)
    }

    useEffect(() => {
        if(modalDatas.datasToEdit) {
            setName(modalDatas.datasToEdit.name)
            setDescription(modalDatas.datasToEdit?.description)
            setPrice(String(modalDatas.datasToEdit.price))
            setInventory(String(modalDatas.datasToEdit.inventory))
            setCategory(modalDatas.datasToEdit.category)
            setBrand(modalDatas.datasToEdit.brand)
        }
    }, [modalDatas])

   
    return (
        <Modal 
            title="Product"
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

                <Input 
                    placeholder='Price'
                    fullWidth={true}
                    value={price}
                    onChange={event => setPrice(event.target.value)}
                />

                <Input 
                    placeholder='Inventory'
                    fullWidth={true}
                    value={inventory}
                    onChange={event => setInventory(event.target.value)}
                />
                
               
                <SelectInput
                    fullWidth={true}
                    isLoading={loadCategory}
                    onChange={event => setCategory(event.target.value)}
                    value={category}
                >
                    <option value="" hidden>Category</option>
                    {
                        modalDatas.isOpen &&
                        categories?.map(category => (
                            <option 
                                key={category._id}
                                value={category._id}
                            >
                                {category.name}
                            </option>
                        ))
                    }
                </SelectInput>

                <SelectInput
                    fullWidth={true}
                    isLoading={loadBrand}
                    onChange={event => setBrand(event.target.value)}
                    value={brand}
                >
                    <option value="" hidden>Brand</option>
                    {
                        modalDatas.isOpen &&
                        brands?.map(brand => (
                            <option 
                                key={brand._id}
                                value={brand._id}
                            >
                                {brand.name}
                            </option>
                        ))
                    }
                </SelectInput>


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