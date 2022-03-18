import { render, screen } from '@testing-library/react'
import { Card } from '.'



describe('Card component', () => {
    it('Renders correctly', () => {
        render (
            <Card 
                handleDelete={jest.fn()}
                handleEdit={jest.fn()}
                name="Test"
                isLoading={false}
            />
        )

        expect(screen.getByText('Test')).toBeInTheDocument()
    })
})
