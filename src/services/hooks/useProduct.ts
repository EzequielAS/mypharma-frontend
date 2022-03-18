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

export async function getProducts() {
    const response = await api.get('product/getProducts')

    return response.data
}

export function useProduct() {
    return useQuery<Product[], Error>(
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