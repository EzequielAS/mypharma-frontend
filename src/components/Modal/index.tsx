import { ReactNode } from 'react'
import { FaWindowClose } from 'react-icons/fa'

import { Container, Content } from './styles'

interface ModalProps {
    title: string;
    isOpen: boolean;
    children: ReactNode;
    closeButtonAction: () => void;
}

export function Modal({ 
    title, 
    isOpen,
    children,
    closeButtonAction, 
}: ModalProps) {
    return (
        <Container isOpen={isOpen}>

            <Content>
                <FaWindowClose 
                    onClick={closeButtonAction}
                />

                <strong>{title}</strong>

                { children }
            </Content>

        </Container>
    )
}