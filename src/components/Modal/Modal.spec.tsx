import { render, screen } from '@testing-library/react'
import { Modal } from '.'


describe('Modal component', () => {
    it('Renders correctly', () => {
        render (
            <Modal 
               children={<p>test</p>}
               closeButtonAction={jest.fn()}
               isOpen={true}
               title="Category"
            />
        )

        expect(screen.getByText('Category')).toBeInTheDocument()
    })
})
