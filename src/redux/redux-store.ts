import { Action, combineReducers, compose, configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { reducer as formReducer } from 'redux-form'
import createSagaMiddleware from 'redux-saga'
import { ThunkAction } from 'redux-thunk'
import profileReducer from '../widgets/Profile/model/profile-reducer'
import usersReducer from '../widgets/Users/model/users-reducer'
import appReducer from '../app/model/app-reducer'
import { authReducer } from './reducers/auth-reducer'
import { chatReducer } from '../widgets/Chat/model/chat-reducer'
import { errorsReducer } from './reducers/errors-reducer'
import { rootSaga } from './sagas/rootSaga'

const rootReducer = combineReducers({
    profilePage: profileReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    chat: chatReducer,
    erros: errorsReducer
})

type RootReducerType = typeof rootReducer // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>

type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never

export type AppDispatch = typeof store.dispatch


export const useAppDispatch = () => useDispatch<AppDispatch>() // instead of using const dispatch: AppDispatch = useDispatch()

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const sagaMiddleware = createSagaMiddleware()
// const store = createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

const store = configureStore({
    reducer: rootReducer,
    // todo thunk should be false
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }).concat(sagaMiddleware)
})
sagaMiddleware.run(rootSaga)
// @ts-ignore
window.__store__ = store // Щоб викликати через консоль
export default store