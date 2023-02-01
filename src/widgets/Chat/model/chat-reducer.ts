import { StatusType } from '../api/main'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'
import { ChatMessageAPIType } from '../../../entities/Message/index'
import { unsubscribeAPI } from '../api/unsubscribe'
import { InferActionsTypes } from '../../../redux/redux-store'
import { ThunkType } from '../../../redux/types/types'
import { sendMessageAPI } from '../api/sendMessage'
import { startAPI } from '../api/start'
import { stopAPI } from '../api/stop'
import { subscribeAPI } from '../api/subscribe'
import { actions } from './chat-actions'


export type ChatMessageType = ChatMessageAPIType & { id: string }

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({ ...m, id: v1() }))]
                    .filter((m, index, array) => index >= array.length - 100)
            }
        case 'CHAT/STATUS_CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        default:
            return state
    }

}