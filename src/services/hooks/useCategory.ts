import { useQuery } from 'react-query'
import { api } from '../api'
import { toast } from 'react-toastify'

export type Category = {
    _id: string;
    name: string;
    description: string;
}

export async function getCategories() {
    const response = await api.get('category/getCategories')

    return response.data
}


export function useCategory() {
    return useQuery<Category[], Error>(
        'category', 
        () => getCategories(),
        {
            staleTime: 1000 * 60 * 5, // 5 minutes
            refetchOnWindowFocus: false,
            onError: (error) => {
                toast.error(error)
            }
        },
    )
}