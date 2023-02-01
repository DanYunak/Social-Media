import { saveProfileAPI } from './../../api/saveProfile'
import { call, put, select, takeEvery } from '@redux-saga/core/effects'
import { APIResponseType, ResultCodesEnum } from '../../../../shared/api/axiosInstance'
import { getUserId } from '../../../../redux/selectors/auth-selectors'
import { actions } from '../profile-actions'
import { SAVE_PROFILE, SAVE_PROFILE_ERROR } from '../../consts'
import { ProfileType } from '../types'

type ActionType = {
    profile: ProfileType
}

export function* saveProfile(action: ActionType | any): any {
    try {
        const res: APIResponseType = yield call(saveProfileAPI, action.profile)
        const userId = yield select(getUserId)

        if (res.resultCode === ResultCodesEnum.Success) {
            if (userId !== null) {
                yield put(actions.getUserProfile(userId))
            } else {
                throw new Error(`userId can't be null`)
            }
        } else {
            return Promise.reject(res.messages)
        }
    } catch {
        yield put({ type: SAVE_PROFILE_ERROR, error: 'Error fetching save profile' })
    }
}

export function* watchSaveProfile() {
    yield takeEvery(SAVE_PROFILE, saveProfile)
}