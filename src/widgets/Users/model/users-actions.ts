import { UserType } from './../../../entities/User/model/types'
import { FOLLOW, FOLLOW_SUCCESS, REQUEST_USERS, SET_CURRENT_PAGE, SET_FILTER, SET_TOTAL_USERS_COUNT, SET_USERS, TOGGLE_IS_FETCHING, TOGGLE_IS_FOLLOWING_PROGRESS, UNFOLLOW, UNFOLLOW_SUCCESS } from '../consts'
import { FilterType } from './users-reducer'

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