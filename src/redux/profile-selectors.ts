import { AppStateType } from './redux-store'

export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile
}

export const getStatusSelector = (state: AppStateType) => {
    return state.profilePage.status
}

export const getAuthorizedId = (state: AppStateType) => {
    return state.auth.id
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
}