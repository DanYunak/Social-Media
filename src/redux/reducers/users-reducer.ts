import { FOLLOW, FOLLOW_SUCCESS, UNFOLLOW, UNFOLLOW_SUCCESS, SET_USERS, REQUEST_USERS, SET_CURRENT_PAGE, SET_FILTER, TOGGLE_IS_FETCHING, TOGGLE_IS_FOLLOWING_PROGRESS, SET_TOTAL_USERS_COUNT } from './constants';
import { updateObjInArray } from '../../utils/object-helpers'
import { Dispatch } from 'react'
import { APIResponseType, ResultCodesEnum } from '../../api/api'
import { usersAPI } from '../../api/users-api'
import { InferActionsTypes, BaseThunkType } from '../redux-store'
import { UserType } from '../types/types'

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


export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(u => { //* Map створює масив на основі минулого масиву, це хороший варіант для зміни даних, для додавання чогось в масив map можна не використовувати, а просто копіювати масив
                    if (u.id === action.userId) { //* Коли map пробігається по масиву і в елементі є action.userId (action при якому потрібно зафоловити користувача, ф-ція внизу в експорті)
                        return { ...u, followed: true } //* Якщо id співпадає то повертає копію і змінює стан підписки, якщо ні, то повертає оригінал без змін
                    }
                    return u
                })
            }

        case 'USERS/UNFOLLOW_SUCCESS':
            return {
                ...state,
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
    follow: (userId: number) => ({ type: FOLLOW, userId } as const),
    followSuccess: (userId: number) => ({ type: FOLLOW_SUCCESS, userId } as const),

    unfollow: (userId: number) => ({ type: UNFOLLOW, userId } as const),
    unfollowSuccess: (userId: number) => ({ type: UNFOLLOW_SUCCESS, userId } as const),

    requestUsers: (page: number, pageSize: number, filter: FilterType) => ({
        type: REQUEST_USERS,
        payload: { page, pageSize, filter }
    } as const),
    setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users } as const),

    setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage } as const),

    setFilter: (filter: FilterType) => ({ type: SET_FILTER, payload: filter } as const),

    toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching } as const),

    toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId
    } as const),
    
    setTotalUsersCount: (usersTotalCount: number) => ({
        type: SET_TOTAL_USERS_COUNT, usersTotalCount
    } as const)
}

//* ===============================================================================================================================================

export default usersReducer