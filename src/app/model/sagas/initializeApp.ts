import { put, takeEvery } from '@redux-saga/core/effects'
import { actionsApp } from '../app-reducer'
import { actions } from '../../../redux/actions/auth-actions'
import { INITIALIZE_APP, INITIALIZE_APP_ERROR } from '../../consts'

function* initializeApp(): any {
    const _initializeApp = yield put(actionsApp.initializedSuccess())

    try {
        const promise = yield put(actions.getAuthUserData())

        Promise.all([promise]).then(() => _initializeApp)
    } catch {
        yield put({ type: INITIALIZE_APP_ERROR, error: 'Error fetching initialize app' })
    }
}

export function* watchInitializeApp() {
    yield takeEvery(INITIALIZE_APP, initializeApp)
}