import { call, put, takeEvery } from '@redux-saga/core/effects';
import { APIResponseType, ResultCodesEnum } from '../../../../shared/api/axiosInstance';
import { updateStatusAPI } from '../../api/updateStatus';
import { UPDATE_STATUS, UPDATE_USER_STATUS_ERROR } from '../../consts';
import { actions } from '../profile-actions';

type ActionType = {
    status: string
}

export function* updateUserStatus(action: ActionType | any): any {
    try {
        const res: APIResponseType = yield call(updateStatusAPI, action.status)

        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.setStatus(action.status))
        }
    } catch {
        yield put({ type: UPDATE_USER_STATUS_ERROR, error: 'Error fetching update status' })
    }
}

export function* watchUpdateUserStatus() {
    yield takeEvery(UPDATE_STATUS, updateUserStatus)
}