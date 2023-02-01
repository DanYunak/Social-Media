import { ChatMessageAPIType } from '../../../entities/Message'
import { StatusType } from '../api/main'
import { MESSAGES_RECEIVED, SEND_MESSAGE, STATUS_CHANGED } from '../consts'

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: MESSAGES_RECEIVED, payload: { messages } } as const),

    statusChanged: (status: StatusType) => ({ type: STATUS_CHANGED, payload: { status } } as const),

    sendMessage: (message: string) => ({ type: SEND_MESSAGE, message } as const)
}