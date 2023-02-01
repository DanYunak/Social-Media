import { put, takeEvery } from '@redux-saga/core/effects'
import { actionsApp, LanguagesType } from '../../../../app/model/app-reducer'
import { CHANGE_LANGUAGE, CHANGE_LANGUAGE_ERROR } from './../../../../app/consts'

type ActionType = {
    language: LanguagesType
}

function* changeLanguage(action: ActionType | any) {
    try {
        yield put(actionsApp.setLanguage(action.language))

        localStorage.setItem('language', JSON.stringify(action.language))
    } catch {
        yield put({ type: CHANGE_LANGUAGE_ERROR, error: 'Error fetching change language' })
    }
}

export function* watchChangeLanguage() {
    yield takeEvery(CHANGE_LANGUAGE, changeLanguage)
}
