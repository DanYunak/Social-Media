import { AppStateType } from './redux-store'

export const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth.captchaUrl
}