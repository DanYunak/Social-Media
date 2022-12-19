import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import '../Dialogs.css';


type PropsType = {
    id: number
    name: string
}

const DialogItem: FC<PropsType> = memo(({ id, name }) => {
    let path = 'dialogs/' + id;

    return (
        <div className='dialogs__item'>
            <NavLink to={path}>{name}</NavLink>
        </div>
    )
})

export default DialogItem;