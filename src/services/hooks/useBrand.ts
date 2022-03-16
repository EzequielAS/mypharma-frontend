import { useQuery } from 'react-query'
import { api } from '../api'
import { toast } from 'react-toastify'

export type Brand = {
    _id: string;
    name: string;
}

export async function getBrands(searchTerm?: string) {
    const response = await api.get(`brand/getBrands/${searchTerm}`)

    return response.data
}


export function useBrand(searchTerm?: string) {
    return useQuery<Brand[], Error>(
        'brand', 
        () => getBrands(searchTerm),
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            onError: (error) => {
                toast.error(error)
            }
        },
    )
}