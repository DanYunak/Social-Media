import { ChatMessageAPIType } from '../../../../entities/Message'
import { StatusType } from '../../api/main'
import { Dispatch } from 'redux'
import { actions } from '../chat-actions'

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
let _statusChangedHandler: ((status: StatusType) => void) | null = null

export const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler
}

export const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (status) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _statusChangedHandler
}