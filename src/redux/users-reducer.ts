import { updateObjInArray } from './../utils/object-helpers'
import { Dispatch } from 'react'
import { APIResponseType, ResultCodesEnum } from '../api/api'
import { usersAPI } from '../api/users-api'
import { InferActionsTypes, BaseThunkType } from './redux-store'
import { UserType } from './types/types'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 3000,
    isFetching: false,
    followingInProgress: [] as Array<number>, //* Коли йде підписка потрібно закидувати в масив id користувача, коли відписка - то забирати (array of users ids)
    filter: {
        term: '',
        friend: null as null | boolean | string
    }
}

export type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter

type ThunkType = BaseThunkType<ActionsTypes>

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW':
            return {
                ...state,
                // users: updateObjInArray(state.users, action.userId, 'id', { followed: true })
                users: state.users.map(u => { //* Map створює масив на основі минулого масиву, це хороший варіант для зміни даних, для додавання чогось в масив map можна не використовувати, а просто копіювати масив
                    if (u.id === action.userId) { //* Коли map пробігається по масиву і в елементі є action.userId (action при якому потрібно зафоловити користувача, ф-ція внизу в експорті)
                        return { ...u, followed: true } //* Якщо id співпадає то повертає копію і змінює стан підписки, якщо ні, то повертає оригінал без змін
                    }
                    return u
                })
            }

        case 'USERS/UNFOLLOW':
            return {
                ...state,
                // users: updateObjInArray(state.users, action.userId, 'id', { followed: false })
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }

        case 'USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }

        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }

        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.usersTotalCount
            }

        case 'USERS/SET_FILTER':
            return { ...state, filter: action.payload }

        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }

        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }
}

//* ACTION CREATORS ==================================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    followSuccess: (userId: number) => ({ type: 'USERS/FOLLOW', userId } as const),

    unfollowSuccess: (userId: number) => ({ type: 'USERS/UNFOLLOW', userId } as const),

    setUsers: (users: Array<UserType>) => ({ type: 'USERS/SET_USERS', users } as const),

    setCurrentPage: (currentPage: number) => ({ type: 'USERS/SET_CURRENT_PAGE', currentPage } as const),

    setFilter: (filter: FilterType) => ({ type: 'USERS/SET_FILTER', payload: filter } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: 'USERS/TOGGLE_IS_FETCHING', isFetching } as const),

    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS', isFetching, userId
    } as const),

    setTotalUsersCount: (usersTotalCount: number) => ({
        type: 'USERS/SET_TOTAL_USERS_COUNT', usersTotalCount
    } as const)
}



//* =================================================================================================================



//* THUNKS ==================================================================================================================

type DispatchType = Dispatch<ActionsTypes>

export const requestUsers = (page: number,
    pageSize: number, filter: FilterType): ThunkType => async (dispatch) => {

        let data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend)

        dispatch(actions.toggleIsFetching(true))
        dispatch(actions.setCurrentPage(page))
        dispatch(actions.setFilter(filter))

        dispatch(actions.toggleIsFetching(false))
        dispatch(actions.setUsers(data.items))
        dispatch(actions.setTotalUsersCount(data.totalCount))
    }

// _ в назві означає, що це допоміжна ф-ція, її не можна типізувати як санки
const _followUnfollowFlow = async (dispatch: DispatchType, userId: number,
    apiMethod: (userId: number) => Promise<APIResponseType>,
    actionCreator: (userId: number) => ActionsTypes) => {

    dispatch(actions.toggleIsFollowingProgress(true, userId))

    let response = await apiMethod(userId)
    if (response.resultCode === ResultCodesEnum.Success) {
        dispatch(actionCreator(userId))
    }
    dispatch(actions.toggleIsFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), actions.followSuccess)
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), actions.unfollowSuccess)
}

//* ===================================================================================================================


export default usersReducer