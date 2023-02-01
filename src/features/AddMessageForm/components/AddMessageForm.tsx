import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { sendMessage } from '../../../widgets/Chat/index'
import { useAppDispatch } from '../../../redux/redux-store'
import { getLanguage } from '../../../app/model/app-selectors'
import { getStatus } from '../../../widgets/Chat/model/chat-selectors'
import { eng } from '../../../shared/constants/languageConsts'

export const AddMessageForm: FC = memo(() => {
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
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{ width: 250, marginTop: 10 }} rows={2} />
            <Button type='primary' htmlType='submit' onClick={sendMessageHandler}
                disabled={status !== 'ready'}
                style={{ marginLeft: 20 }}>{language === eng ? 'Send' : 'Надіслати'}</Button>
        </div>
    )
})