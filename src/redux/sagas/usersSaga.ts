import { FOLLOW_ERROR, UNFOLLOW_ERROR, REQUEST_USERS, FOLLOW, UNFOLLOW } from './../reducers/constants';
import { ResultCodesEnum } from './../../api/api';
import { GetItemsType, usersAPI } from './../../api/users-api'
import { call, fork, put, takeEvery, spawn, all } from '@redux-saga/core/effects'
import { actions, FilterType } from './../reducers/users-reducer'
import { APIResponseType } from '../../api/api'
import { REQUEST_USERS_ERROR } from '../reducers/constants';

//* WORKERS ===================================================================================================================================

type ActionType = {
    type: string
    payload: {
        page: number
        pageSize: number
        filter: FilterType
    }
    userId: number
}

function* requestUsers(action: ActionType) {
    try {
        const {page, pageSize, filter} = action.payload
        const res: GetItemsType = yield call(usersAPI.getUsers, page, pageSize, filter.term, filter.friend)

        yield put(actions.toggleIsFetching(true))
        yield put(actions.setCurrentPage(page))
        yield put(actions.setFilter(filter))

        yield put(actions.toggleIsFetching(false))
        yield put(actions.setUsers(res.items))
        yield put(actions.setTotalUsersCount(res.totalCount))
    } catch {
        yield put({ type: REQUEST_USERS_ERROR, error: 'Error fetching request users' })
    }
}

function* follow(action: ActionType): any {
    try {
        yield put(actions.toggleIsFollowingProgress(true, action.userId))

        const res: APIResponseType = yield call(usersAPI.follow, action.userId)
        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.followSuccess(action.userId))
        }

        yield put(actions.toggleIsFollowingProgress(false, action.userId))
    } catch {
        yield put({ type: FOLLOW_ERROR, error: 'Error fetching follow' })
    }
}

function* unfollow(action: ActionType): any {
    try {
        yield put(actions.toggleIsFollowingProgress(true, action.userId))

        const res: APIResponseType = yield call(usersAPI.unfollow, action.userId)
        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.unfollowSuccess(action.userId))
        }

        yield put(actions.toggleIsFollowingProgress(false, action.userId))
    } catch {
        yield put({ type: UNFOLLOW_ERROR, error: 'Error fetching unfollow' })
    }
}

//* ============================================================================================================================================

//* WATCHERS ===================================================================================================================================

export function* watchRequestUsers() {
    yield takeEvery(REQUEST_USERS, requestUsers)
}

export function* watchFollow() {
    yield takeEvery(FOLLOW, follow)
}

export function* watchUnfollow() {
    yield takeEvery(UNFOLLOW, unfollow)
}

//* ============================================================================================================================================


export function* usersRootSaga() {
    yield all([
        watchRequestUsers(),
        watchFollow(),
        watchUnfollow()
    ])
}