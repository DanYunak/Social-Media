import { ThunkType } from '../../../../redux/types/types'
import { stopAPI } from '../../api/stop'
import { unsubscribeAPI } from './../../api/unsubscribe'
import { newMessageHandlerCreator, statusChangedHandlerCreator } from './main'


export const stopMessagesListening = (): ThunkType => async (dispatch) => {
    unsubscribeAPI('message-received', newMessageHandlerCreator(dispatch))
    unsubscribeAPI('status-changed', statusChangedHandlerCreator(dispatch))
    stopAPI()
}