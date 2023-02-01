import { FC, memo, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Message } from '../../../../entities/Message/index'
import { getMessages } from '../../model/chat-selectors'

export const Messages: FC = memo(() => {
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