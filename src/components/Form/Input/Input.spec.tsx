import { render, screen } from '@testing-library/react'
import { Input } from '.'


describe('Input component', () => {
    it('Renders correctly', () => {
        render (
            <Input 
                placeholder='test'
            />
        )

        expect(screen.getByPlaceholderText('test')).toBeInTheDocument()
    })
})
