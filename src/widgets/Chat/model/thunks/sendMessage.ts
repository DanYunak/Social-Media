import { ThunkType } from '../../../../redux/types/types'
import { sendMessageAPI } from '../../api/sendMessage'

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    sendMessageAPI(message)
}