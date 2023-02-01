import { call, put, takeEvery } from '@redux-saga/core/effects'
import { GET_STATUS, SET_USER_STATUS_ERROR } from '../../consts'
import { actions } from '../profile-actions'
import { ProfileType } from '../types'
import { getStatusAPI } from './../../api/getStatus'


type ActionType = {
    userId: number | undefined
}

export function* handleUserStatus(action: ActionType | any): any {
    try {
        const res = yield call(getStatusAPI, action.userId)
        yield put(actions.setStatus(res.data))
    } catch {
        yield put({ type: SET_USER_STATUS_ERROR, error: 'Error fetching user status' })
    }
}

export function* watchHandleUserStatus() {
    yield takeEvery(GET_STATUS, handleUserStatus)
}