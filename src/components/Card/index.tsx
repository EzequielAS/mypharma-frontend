import { 
    FaRegEdit, 
    FaRegTrashAlt, 
    FaRegCaretSquareDown 
} from 'react-icons/fa'

import { Container } from './styles'

interface CardProps {
    name: string;
}

export function Card({ name }: CardProps) {
    return (
        <Container>
            <p>{name}</p>
            
            <div>
                <FaRegEdit />
                <FaRegTrashAlt />
                <FaRegCaretSquareDown />
            </div>
        </Container>
    )
}