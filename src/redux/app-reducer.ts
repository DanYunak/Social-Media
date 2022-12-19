import { getAuthUserData } from './auth-reducer'
import { ThunkAction } from 'redux-thunk'
import { AppStateType, InferActionsTypes } from './redux-store'


let initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'APP/INITIALIZED_SUCCESS':
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

//* ACTION CREATORS ============================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializedSuccess: () => ({ type: 'APP/INITIALIZED_SUCCESS' } as const)
}

//* ============================================================================================================


//* THUNKS ============================================================================================================

type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => (dispatch) => {
    let promise = dispatch(getAuthUserData())

    Promise.all([promise]) //* Тільки після виконання всіх промісів почне виконуватися код
        .then(() => {
            dispatch(actions.initializedSuccess()) //? Коли виконається проміс і отримаються дані про юзера, тільки після цього програма заініціалізується
        })
}

//* ============================================================================================================

export default appReducer