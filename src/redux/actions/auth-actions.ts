import { GET_AUTH_USER_DATA, GET_CAPTCHA_URL_SUCCESS, LOGIN, LOGOUT, SET_USER_DATA } from '../reducers/constants'

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