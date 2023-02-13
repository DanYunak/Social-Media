import { SendOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../app/model/app-selectors'
import { useAppDispatch } from '../../../redux/redux-store'
import { sendMessage } from '../../../widgets/Chat/index'
import { getStatus } from '../../../widgets/Chat/model/chat-selectors'
import './AddMessageForm.css'

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
        <div className='chat__actions'>
            <TextArea onChange={(e) => setMessage(e.currentTarget.value)} value={message} style={{ width: 250, marginTop: 10 }} rows={2} />
            <Button type='primary' htmlType='submit' className='send__btn' onClick={sendMessageHandler}
                disabled={status !== 'ready'}
                style={{ marginLeft: 20 }}><SendOutlined /></Button>
        </div>
    )
})