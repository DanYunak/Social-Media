import { INITIALIZE_APP, CHANGE_LANGUAGE, INITIALIZE_APP_ERROR, CHANGE_LANGUAGE_ERROR } from './../reducers/constants';
import { call, fork, put, takeEvery, all, select, cancel, cancelled, take } from '@redux-saga/core/effects'
import { actionsApp, LanguagesType } from '../reducers/app-reducer'
import { actions } from '../reducers/auth-reducer'

type ActionType = {
    language: LanguagesType
}

//* WORKERS ===================================================================================================================================

function* initializeApp(): any {

    const _initializeApp = yield put(actionsApp.initializedSuccess())

    try {
        const promise = yield put(actions.getAuthUserData())

        Promise.all([promise]).then(() => _initializeApp)
    } catch {
        yield put({ type: INITIALIZE_APP_ERROR, error: 'Error fetching initialize app' })
    }
}

function* changeLanguage(action: ActionType | any) {
    try {
        yield put(actionsApp.setLanguage(action.language))

        localStorage.setItem('language', JSON.stringify(action.language))
    } catch {
        yield put({ type: CHANGE_LANGUAGE_ERROR, error: 'Error fetching change language' })
    }
}

//* ===========================================================================================================================================


//* WATCHERS ===================================================================================================================================

export function* watchHandleInitializeApp() {
    yield takeEvery(INITIALIZE_APP, initializeApp)
}

export function* watchChangeLanguage() {
    yield takeEvery(CHANGE_LANGUAGE, changeLanguage)
}

//* ===========================================================================================================================================


export function* appRootSaga() {
    yield all([
        watchHandleInitializeApp(),
        watchChangeLanguage()
    ])
}