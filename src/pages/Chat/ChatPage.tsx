import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { FC, memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getLanguage } from '../../redux/app-selectors'
import { sendMessage, startMessagesListening, stopMessagesListening } from '../../redux/chat-reducer'
import { getMessages, getStatus } from '../../redux/chat-selectors'
import { getAuthorizedId } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'


export type ChatMessageAPIType = {
    userId: number
    userName: string
    message: string
    photo: string
}

export const ChatPage: FC = memo(() => {
    return (
        <Chat />
    )
})

const Chat: FC = memo(() => {
    const dispatch = useAppDispatch()

    const status = useSelector(getStatus)

    useEffect(() => {
        dispatch(startMessagesListening())
        return (() => {
            dispatch(stopMessagesListening())
        })
    }, [])

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

const Message: FC<{ message: ChatMessageAPIType }> = memo(({ message }) => {

    const authorizedId = useSelector(getAuthorizedId)
    const language = useSelector(getLanguage)

    return (
        <div style={{ marginTop: 20, display: 'flex', alignItems: 'center' }}>
                {message.userId !== authorizedId
                    ? <Link to={`/profile/${message.userId}` }>
                        <img src={message.photo} width='50' height='50' style={{ marginRight: 15 }} />
                        <div>{message.userName}</div>
                    </Link>
                    : <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <img src={message.photo} width='50' height='50' style={{ marginRight: 15 }} />
                        <b style={{marginLeft: -40}}>{language === 'english' ? 'You' : 'Ви'}</b>
                    </div>
                }
            <br />
            {message.message}
        </div >
    )
})

const Messages: FC = memo(() => {
    const messages = useSelector(getMessages)
    const messageAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(false)

    useEffect(() => {
        if (isAutoScroll) {
            messageAnchorRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [messages])

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return (
        <>
            <div style={{ height: 500, overflowY: 'auto' }} onScroll={scrollHandler}>
                {messages.map(m => <Message message={m} key={m.id} />)}
                <div ref={messageAnchorRef}></div>
            </div>
        </>
    )
})


const AddMessageForm: FC = memo(() => {
    const [message, setMessage] = useState('')

    const status = useSelector(getStatus)
    const language = useSelector(getLanguage)

    const sendMessageHandler = () => {

        if (!message) return

        dispatch(sendMessage(message))
        setMessage('')
    }

    const dispatch = useAppDispatch()

    return (
        <div>
            {/* <textarea onChange={(e) => setMessage(e.currentTarget.value)} value={message}></textarea> */}
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{ width: 250, marginTop: 10 }} rows={2} />
            <Button type='primary' htmlType='submit' onClick={sendMessageHandler}
                disabled={status !== 'ready'}
                style={{ marginLeft: 20 }}>{language === 'english' ? 'Send' : 'Надіслати'}</Button>
        </div>
    )
})