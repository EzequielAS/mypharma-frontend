import { useQuery } from 'react-query'
import { api } from '../api'
import { toast } from 'react-toastify'
import { Brand } from './useBrand'
import { Category } from './useCategory'

export interface Product {
    _id: string;
    name: string;
    description: string;
    inventory: number;
    price: number;
    brand: Brand;
    category: Category;
}

interface ProductFormatted extends Omit<Product, 'price'> {
    price: string;
}

export async function getProducts() {
    const response = await api.get('product/getProducts')

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
}

export function useProduct() {
    return useQuery<ProductFormatted[], Error>(
        'product', 
        getProducts,
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            onError: (error) => {
                toast.error(error)
            }
        },
    )
}