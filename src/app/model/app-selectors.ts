import { AppStateType } from '../../redux/redux-store'

export const getInitialized = (state: AppStateType) => {
    return state.app.initialized
}

export const getLanguage = (state: AppStateType) => {
    return state.app.language
}