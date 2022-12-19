import { chatAPI, StatusType } from './../api/chat-api'
import { ThunkType } from './types/types'
import { InferActionsTypes } from './redux-store'
import { ChatMessageAPIType } from './../pages/Chat/ChatPage'
import { Dispatch } from 'redux'
import { v1 } from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
    messages: [] as ChatMessageType[],
    status: 'pending' as StatusType
}

export type InitialStateType = typeof initialState


export const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'CHAT/MESSAGES_RECEIVED':
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))]
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

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    messagesReceived: (messages: ChatMessageAPIType[]) => ({ type: 'CHAT/MESSAGES_RECEIVED', payload: { messages } } as const),
    statusChanged: (status: StatusType) => ({ type: 'CHAT/STATUS_CHANGED', payload: { status } } as const)
}


let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
let _statusChangedHandler: ((status: StatusType) => void) | null = null

const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.start()
    chatAPI.subscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
}

export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    chatAPI.unsubscribe('message-received', newMessageHandlerCreator(dispatch))
    chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
    chatAPI.stop()
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}