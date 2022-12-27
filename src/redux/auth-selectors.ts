import { AppStateType } from './redux-store'

export const getUserLogin = (state: AppStateType) => {
    return state.auth.login
}