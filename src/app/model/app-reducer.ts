import { InferActionsTypes } from '../../redux/redux-store';
import { CHANGE_LANGUAGE, INITIALIZED_SUCCESS, INITIALIZE_APP, SET_LANGUAGE } from '../consts'


export type LanguagesType = 'english' | 'ukrainian'

// @ts-ignore
export const languageParse = JSON.parse(localStorage.getItem('language'))

const initialState = {
    initialized: false,
    language: languageParse
}

type InitialStateType = typeof initialState


const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        case 'APP/SET_LANGUAGE':
            return {
                ...state,
                language: action.language
            }
        default:
            return state
    }
}

//* ACTION CREATORS ============================================================================================================

type ActionsTypes = InferActionsTypes<typeof actionsApp>

export const actionsApp = {
    initializeApp: () => ({ type: INITIALIZE_APP } as const),
    initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const),

    changeLanguage: (language: LanguagesType) => ({ type: CHANGE_LANGUAGE, language } as const),
    setLanguage: (language: LanguagesType) => ({ type: SET_LANGUAGE, language } as const)
}

//* ============================================================================================================

export default appReducer