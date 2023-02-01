import { ThunkType } from '../../../../redux/types/types'
import { startAPI } from '../../api/start'
import { subscribeAPI } from '../../api/subscribe'
import { newMessageHandlerCreator, statusChangedHandlerCreator } from './main'

export const startMessagesListening = (): ThunkType => async (dispatch) => {
    startAPI()
    subscribeAPI('message-received', newMessageHandlerCreator(dispatch))
    subscribeAPI('status-changed', statusChangedHandlerCreator(dispatch))
}