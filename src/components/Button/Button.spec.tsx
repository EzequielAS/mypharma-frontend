import { render, screen } from '@testing-library/react'
import { Button } from '.'


describe('Button component', () => {
    it('Renders correctly', () => {
        render (
            <Button text="Ok"/>
        )

        expect(screen.getByText('Ok')).toBeInTheDocument()
    })
})
