import { all, fork } from '@redux-saga/core/effects'
import { appRootSaga } from './appRootSaga'
import { authRootSaga } from './authSaga'
import { profileRootSaga } from './profileRootSaga'
import { usersRootSaga } from './usersRootSaga'

export function* rootSaga() {
    yield all([
        fork(appRootSaga),
        fork(authRootSaga),
        fork(profileRootSaga),
        fork(usersRootSaga)
    ])
}