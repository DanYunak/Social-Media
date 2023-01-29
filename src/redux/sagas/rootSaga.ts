import { all, fork, spawn } from '@redux-saga/core/effects'
import { appRootSaga } from './appSaga'
import { authRootSaga, watchGetAuthUserData, watchGetCaptchaUrl, watchLogin, watchLogout,  } from './authSaga'
import { profileRootSaga, watchHandleUserProfile, watchHandleUserStatus, watchSavePhoto, watchSaveProfile, watchUpdateUserStatus } from './profileSaga'
import { usersRootSaga, watchFollow, watchRequestUsers, watchUnfollow } from './usersSaga'

export function* rootSaga() {
    yield all([
        fork(appRootSaga),
        fork(authRootSaga),
        fork(profileRootSaga),
        fork(usersRootSaga)
    ])
}