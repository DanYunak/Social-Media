import { all } from '@redux-saga/core/effects'
import { watchFollow } from '../../entities/User/model/sagas/follow'
import { watchUnfollow } from '../../entities/User/model/sagas/unfollow'
import { watchRequestUsers } from '../../widgets/Users/index'

export function* usersRootSaga() {
    yield all([
        watchRequestUsers(),
        watchFollow(),
        watchUnfollow()
    ])
}