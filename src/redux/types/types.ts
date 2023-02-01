import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'

// @ts-ignore
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> // ActionsTypes - types of action creators in file