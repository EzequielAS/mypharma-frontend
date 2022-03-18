import { render, screen } from '@testing-library/react'
import { SearchInput } from '.'


describe('SearchInput component', () => {
    it('Renders correctly', () => {
        render (
            <SearchInput 
                handleSearch={jest.fn()}
                placeholder='test'
            />
        )

        expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
    })
})
