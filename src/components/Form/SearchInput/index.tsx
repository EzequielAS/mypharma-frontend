import { FormEvent, InputHTMLAttributes } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Container } from './styles'


interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement>{
    handleSearch: () => void;
}

export function SearchInput({ handleSearch, ...rest }: SearchInputProps) {
    function executeClick(event: FormEvent) {
        event.preventDefault()

        handleSearch()
    }

    return (
        <Container onSubmit={executeClick}>
            <input 
                {...rest}
            />

            <button type="submit">
                <FaSearch />
            </button>
        </Container>
    )
}