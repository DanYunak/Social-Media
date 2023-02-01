import { AppStateType } from '../../../redux/redux-store'

export const getCaptchaUrlSelector = (state: AppStateType) => {
    return state.auth.captchaUrl
}