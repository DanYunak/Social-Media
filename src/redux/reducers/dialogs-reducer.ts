import { InferActionsTypes } from '../redux-store'
import { DialogType } from '../types/types'
import { MessageType } from '../types/types'

let initialState = { //? Одноразовий об'єкт, у випадку яку в profileReducer не прийде state, то він ним і буде локально, щоб не видавало помилку
    dialogsData: [
        { id: 1, name: 'Dan' },
        { id: 2, name: 'Anna' },
        { id: 3, name: 'Julia' },
        { id: 4, name: 'Dima' },
        { id: 5, name: 'Alex' }
    ] as Array<DialogType>,
    messagesData: [
        { id: 1, message: 'Hi!' },
        { id: 2, message: 'OK' },
        { id: 3, message: 'What are you doing tonight?' }
    ] as Array<MessageType>
}

export type InitialStateType = typeof initialState

//? this._state.dialogsPage приходить у ф-цію у виді state зі state.js
const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'DIALOGS/SEND_MESSAGE':
            let body = action.newMessageBody
            return {
                ...state,
                messagesData: [...state.messagesData, { id: 4, message: body }],
            }
        default:
            return state
    }
}

//* ACTION CREATORS =========================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    sendMessage: (newMessageBody: string) => ({
        type: 'DIALOGS/SEND_MESSAGE', newMessageBody
    } as const)
}


//* ========================================================================================================================

export default dialogsReducer