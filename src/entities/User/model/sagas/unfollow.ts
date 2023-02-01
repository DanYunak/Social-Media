import { unfollowAPI } from './../../api/unfollow'
import { call, put, takeEvery } from '@redux-saga/core/effects'
import { UNFOLLOW, UNFOLLOW_ERROR } from '../../../../widgets/Users/consts'
import { actions } from '../../../../widgets/Users/model/users-actions'
import { APIResponseType, ResultCodesEnum } from '../../../../shared/api/axiosInstance'


type ActionType = {
    userId: number
}

function* unfollow(action: ActionType | any): any {
    try {
        yield put(actions.toggleIsFollowingProgress(true, action.userId))

        const res: APIResponseType = yield call(unfollowAPI, action.userId)
        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.unfollowSuccess(action.userId))
        }

        yield put(actions.toggleIsFollowingProgress(false, action.userId))
    } catch {
        yield put({ type: UNFOLLOW_ERROR, error: 'Error fetching unfollow' })
    }
}

export function* watchUnfollow() {
    yield takeEvery(UNFOLLOW, unfollow)
}