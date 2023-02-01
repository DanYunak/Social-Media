import { call, put, takeEvery } from '@redux-saga/core/effects'
import { APIResponseType, ResultCodesEnum } from '../../../../shared/api/axiosInstance'
import { savePhotoAPI, SavePhotoDataType } from '../../api/savePhoto'
import { SAVE_PHOTO, SAVE_PHOTO_ERROR } from '../../consts'
import { actions } from '../profile-actions'

type ActionType = {
    file: File
}

export function* savePhoto(action: ActionType | any): any {
    try {
        const res: APIResponseType<SavePhotoDataType> = yield call(savePhotoAPI, action.file)

        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.savePhotoSuccess(res.data.photos))
        }
    } catch {
        yield put({ type: SAVE_PHOTO_ERROR, error: 'Error fetching save photo' })
    }
}

export function* watchSavePhoto() {
    yield takeEvery(SAVE_PHOTO, savePhoto)
}