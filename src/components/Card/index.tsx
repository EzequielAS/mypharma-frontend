import { 
    FaRegEdit, 
    FaRegTrashAlt, 
    FaRegCaretSquareDown 
} from 'react-icons/fa'

import { Container, Main, Informations } from './styles'

interface CardProps {
    name: string;
    informations?: string[];
}

export function Card({ name, informations }: CardProps) {
    return (
        <Container>
            <Main>
                <p>{name}</p>
                
                <div>
                    <FaRegEdit />
                    <FaRegTrashAlt />
                </div>
            </Main>

            {
                informations && 
                <Informations>
                    {
                        informations.map(info => (
                            <p key={info}>
                                {info}
                            </p>
                        ))
                    }
                </Informations>
            }
        </Container>
    )
}