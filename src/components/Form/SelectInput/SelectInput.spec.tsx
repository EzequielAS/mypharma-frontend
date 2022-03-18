import { render, screen } from '@testing-library/react'
import { SelectInput } from '.'


describe('SelectInput component', () => {
    it('Renders correctly', () => {
        render (
            <SelectInput 
                placeholder='test'  
            />
        )

        expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
    })
})
