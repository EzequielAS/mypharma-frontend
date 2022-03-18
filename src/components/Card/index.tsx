import { 
    FaRegEdit, 
    FaRegTrashAlt, 
} from 'react-icons/fa'

import { Container, Main, Informations } from './styles'

interface CardProps {
    name: string;
    informations?: string[];
    isLoading: boolean;
    handleDelete: () => void;
    handleEdit: () => void;
}

export function Card({ 
    name, 
    informations, 
    isLoading, 
    handleDelete,
    handleEdit
}: CardProps) {
    const checkingIfExistsDatas = informations && informations[0] === ''

    return (
        <Container isLoading={isLoading}>
            <Main>
                <p>{name}</p>
                
                <div>
                    <FaRegEdit onClick={handleEdit}/>
                    <FaRegTrashAlt onClick={handleDelete}/>
                </div>
            </Main>

            {
                informations && !checkingIfExistsDatas &&
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