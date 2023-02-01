import { all } from '@redux-saga/core/effects'
import { watchHandleUserProfile } from '../../widgets/Profile/model/sagas/handleUserProfile'
import { watchHandleUserStatus } from '../../widgets/Profile/model/sagas/handleUserStatus'
import { watchSavePhoto } from '../../widgets/Profile/model/sagas/savePhoto'
import { watchSaveProfile } from '../../widgets/Profile/model/sagas/saveProfile'
import { watchUpdateUserStatus } from '../../widgets/Profile/model/sagas/updateUserStatus'

export function* profileRootSaga() {
    yield all([
        watchHandleUserProfile(),
        watchHandleUserStatus(),
        watchUpdateUserStatus(),
        watchSaveProfile(),
        watchSavePhoto()
    ])
}