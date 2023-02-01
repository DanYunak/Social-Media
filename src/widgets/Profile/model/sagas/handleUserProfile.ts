import { call, put, takeEvery } from '@redux-saga/core/effects'
import { actions } from '../profile-actions'
import { GET_USER_PROFILE, SET_USER_PROFILE_ERROR } from '../../consts'
import { getProfileAPI } from '../../api/getProfile'

type ActionType = {
    userId: number | undefined
}

export function* handleUserProfile(action: ActionType | any): any {
    try {
        const res = yield call(getProfileAPI, action.userId)
        yield put(actions.setUserProfile(res.data))
    } catch {
        yield put({ type: SET_USER_PROFILE_ERROR, error: 'Error fetching user profile' })
    }
}

export function* watchHandleUserProfile(): any {
    yield takeEvery(GET_USER_PROFILE, handleUserProfile)
}