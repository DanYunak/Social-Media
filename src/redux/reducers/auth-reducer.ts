import { InferActionsTypes } from '../redux-store'
import { GET_AUTH_USER_DATA, GET_CAPTCHA_URL_SUCCESS, LOGIN, LOGOUT, SET_USER_DATA } from './constants'


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, //? if null, then captcha is not required
}

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
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

//* ACTION CREATORS ===========================================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {

    getAuthUserData: () => ({ type: GET_AUTH_USER_DATA } as const),

    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: SET_USER_DATA, payload: { id, email, login, isAuth }
    } as const),

    getCaptchaUrl: () => ({ type: 'AUTH/GET_CAPTCHA_URL' } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
    } as const),

    login: (email: string, password: string, rememberMe: boolean, captcha: string) => ({
        type: LOGIN,
        payload: { email, password, rememberMe, captcha }
    } as const),

    logout: (navigate: any) => ({ type: LOGOUT, navigate } as const)
}

//*============================================================================================================================================================================

export default authReducer