import { call, put, takeEvery } from '@redux-saga/core/effects'
import { APIResponseType, ResultCodesEnum } from '../../../../shared/api/axiosInstance'
import { FOLLOW, FOLLOW_ERROR } from '../../../../widgets/Users/consts'
import { actions } from '../../../../widgets/Users/model/users-actions'
import { followAPI } from './../../api/follow'

type ActionType = {
    userId: number
}

function* follow(action: ActionType | any): any {
    try {
        yield put(actions.toggleIsFollowingProgress(true, action.userId))

        const res: APIResponseType = yield call(followAPI, action.userId)
        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.followSuccess(action.userId))
        }

        yield put(actions.toggleIsFollowingProgress(false, action.userId))
    } catch {
        yield put({ type: FOLLOW_ERROR, error: 'Error fetching follow' })
    }
}

export function* watchFollow() {
    yield takeEvery(FOLLOW, follow)
}