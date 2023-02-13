import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import { getAuthorizedId } from '../../../widgets/Profile/model/profile-selectors'
import { ChatMessageAPIType } from '../model/types'
import './Message.css'

export const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {

    const authorizedId = useSelector(getAuthorizedId)
    const language = useSelector(getLanguage)

    return (
        <div className='message__container'>
            {message.userId !== authorizedId
                ? <Link to={`/profile/${message.userId}`}>
                    <img src={message.photo} width='50' height='50' style={{ marginRight: 15 }} />
                    <div className='message__username'>{message.userName}</div>
                </Link>
                : <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <img src={message.photo} width='50' height='50' style={{ marginRight: 15 }} />
                    <b style={{ marginLeft: -40 }}>{language === eng ? 'You' : 'Ви'}</b>
                </div>
            }
            <br />
            <div className='message'>
                {message.message}
            </div>
        </div >
    )
})