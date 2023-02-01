import { actions } from '../actions/auth-actions'
import { InferActionsTypes } from '../redux-store'

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, //? if null, then captcha is not required
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionsTypes<typeof actions>

export const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'AUTH/SET_USER_DATA':
        case 'AUTH/GET_CAPTCHA_URL_SUCCESS':
            return {
                ...state,
                ...action.payload, // В payload будуть лежати id, email, login
            }

        default:
            return state
    }
}
