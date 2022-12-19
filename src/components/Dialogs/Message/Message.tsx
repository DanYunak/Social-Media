import React, { FC, memo } from 'react';
import '../Dialogs.css';

type PropsType = {
    message: string
}

const Message: FC<PropsType> = memo(({ message }) => {
    return (
        <div>
            <div className='message'>{message}</div>
        </div>
    )
})

export default Message;