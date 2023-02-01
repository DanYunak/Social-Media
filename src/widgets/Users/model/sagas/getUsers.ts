import { call, put, takeEvery } from '@redux-saga/core/effects'
import { GetItemsType } from '../../api/getUsers'
import { REQUEST_USERS, REQUEST_USERS_ERROR } from '../../index'
import { actions } from '../users-actions'
import { FilterType } from '../users-reducer'
import { getUsersAPI } from './../../api/getUsers'

type ActionType = {
    type: string
    payload: {
        page: number
        pageSize: number
        filter: FilterType
    }
}


function* requestUsers(action: ActionType) {
    try {
        const { page, pageSize, filter } = action.payload
        const res: GetItemsType = yield call(getUsersAPI, page, pageSize, filter.term, filter.friend)

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

export function* watchRequestUsers() {
    yield takeEvery(REQUEST_USERS, requestUsers)
}