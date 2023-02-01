import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { AddMessageForm } from '../../../../features/AddMessageForm/index'
import { useAppDispatch } from '../../../../redux/redux-store'
import { getStatus } from '../../model/chat-selectors'
import { getIsAuth } from '../../../Profile/model/profile-selectors'
import { Messages } from '../Messages/Messages'
import { startMessagesListening, stopMessagesListening } from '../../index'

export const Chat: FC = memo(() => {
    const dispatch = useAppDispatch()

    const status = useSelector(getStatus)
    const isAuth = useSelector(getIsAuth)

    const navigate = useNavigate()

    useEffect(() => {
        dispatch(startMessagesListening())
        return (() => {
            dispatch(stopMessagesListening())
        })
    }, [])

    useEffect(() => {
        if (!isAuth) {
            navigate('/login')
        }
    }, [isAuth])

    return (
        <div>
            {status === 'error' && <div>Some error has occured. Please refresh the page</div>}
            <>
                <Messages />
                <AddMessageForm />
            </>
        </div>
    )
})