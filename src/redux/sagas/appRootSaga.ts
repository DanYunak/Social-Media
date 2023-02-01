import { all } from '@redux-saga/core/effects'
import { watchInitializeApp } from '../../app/model/sagas/initializeApp'
import { watchChangeLanguage } from '../../features/ChangeLanguage/model/sagas/changeLanguage'


export function* appRootSaga() {
    yield all([
        watchInitializeApp(),
        watchChangeLanguage()
    ])
}