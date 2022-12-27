import { FormAction, stopSubmit } from 'redux-form'
import { ResultCodesEnum } from '../api/api'
import { authAPI } from '../api/auth-api'
import { securityAPI } from '../api/security-api'
import { InferActionsTypes, BaseThunkType } from './redux-store'


let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captchaUrl: null as string | null, //? if null, then captcha is not required
}

export type InitialStateType = typeof initialState

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

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

//* ACTION CREATORS =========================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

const actions = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'AUTH/SET_USER_DATA', payload: { id, email, login, isAuth }
    } as const),

    getCaptchaUrlSuccess: (captchaUrl: string) => ({
        type: 'AUTH/GET_CAPTCHA_URL_SUCCESS', payload: { captchaUrl }
    } as const)
}


//*============================================================================================================================================================================



//* THUNKS =========================================================================================================

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    const meData = await authAPI.me()

    if (meData.resultCode === ResultCodesEnum.Success) { //? 0 - все добре
        let { id, login, email } = meData.data
        dispatch(actions.setAuthUserData(id, email, login, true)) //? true - isAuth: true, логінізація пройшла успішно
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    const loginData = await authAPI.login(email, password, rememberMe, captcha)

    if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData())
    } else
        if (loginData.resultCode === ResultCodesEnum.CaptchaIsRequired) {
            dispatch(getCaptchaUrl())
        }
    let message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error'
    dispatch(stopSubmit('login', { _error: message })) //? login - унікальне ім'я форми, знаходиться в Login.jsx (reduxForm)
}


export const logout = (): ThunkType => async (dispatch) => {
    const logoutData = await authAPI.logout()

    if (logoutData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setAuthUserData(null, null, null, false))
    }
}

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    const captchaUrlData = await securityAPI.getCaptchaUrl()
    const captchaUrl = captchaUrlData.url

    dispatch(actions.getCaptchaUrlSuccess(captchaUrl))
}

//*============================================================================================================================================================================

export default authReducer