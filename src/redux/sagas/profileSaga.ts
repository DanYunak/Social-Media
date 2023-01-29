import { SAVE_PROFILE_ERROR, SET_USER_PROFILE_ERROR, SET_USER_STATUS_ERROR, UPDATE_USER_STATUS_ERROR, SAVE_PHOTO_ERROR, GET_USER_PROFILE, GET_STATUS, UPDATE_STATUS, SAVE_PHOTO, SAVE_PROFILE } from './../reducers/constants';
import { ProfileType } from '../types/types'
import { getUserId } from '../selectors/auth-selectors'
import { APIResponseType, ResultCodesEnum } from '../../api/api'
import { profileAPI, SavePhotoDataType } from '../../api/profile-api'
import { call, fork, put, takeEvery, all, select, take } from '@redux-saga/core/effects'
import { actions } from '../reducers/profile-reducer'

type ActionType = {
    type: string
    userId: number | undefined
    status: string
    profile: ProfileType
    file: File
}


//* WORKERS ===================================================================================================================================

export function* handleUserProfile(action: ActionType): any {
    try {
        const res = yield call(profileAPI.getProfile, action.userId)
        yield put(actions.setUserProfile(res.data))
    } catch {
        yield put({ type: SET_USER_PROFILE_ERROR, error: 'Error fetching user profile' })
    }
}

export function* handleUserStatus(action: ActionType): any {
    try {
        const res = yield call(profileAPI.getStatus, action.userId)
        yield put(actions.setStatus(res.data))
    } catch {
        yield put({ type: SET_USER_STATUS_ERROR, error: 'Error fetching user status' })
    }
}

export function* updateUserStatus(action: ActionType): any {
    try {
        const res: APIResponseType = yield call(profileAPI.updateStatus, action.status)

        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.setStatus(action.status))
        }
    } catch {
        yield put({ type: UPDATE_USER_STATUS_ERROR, error: 'Error fetching update status' })
    }
}

export function* saveProfile(action: ActionType): any {
    try {
        const res: APIResponseType = yield call(profileAPI.saveProfile, action.profile)
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

export function* savePhoto(action: ActionType): any {
    try {
        const res: APIResponseType<SavePhotoDataType> = yield call(profileAPI.savePhoto, action.file)

        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.savePhotoSuccess(res.data.photos))
        }
    } catch {
        yield put({ type: SAVE_PHOTO_ERROR, error: 'Error fetching save photo' })
    }
}

//* ============================================================================================================================================



//* WATCHERS ===================================================================================================================================

export function* watchHandleUserProfile(): any {
    yield takeEvery(GET_USER_PROFILE, handleUserProfile)
}

export function* watchHandleUserStatus() {
    yield takeEvery(GET_STATUS, handleUserStatus)
}

export function* watchUpdateUserStatus() {
    yield takeEvery(UPDATE_STATUS, updateUserStatus)
}

export function* watchSaveProfile() {
    yield takeEvery(SAVE_PROFILE, saveProfile)
}

export function* watchSavePhoto() {
    yield takeEvery(SAVE_PHOTO, savePhoto)
}

//* ============================================================================================================================================

export function* profileRootSaga() {
    yield all([
        watchHandleUserProfile(),
        watchHandleUserStatus(),
        watchUpdateUserStatus(),
        watchSaveProfile(),
        watchSavePhoto()
    ])
}