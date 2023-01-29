import { GET_AUTH_USER_DATA, GET_AUTH_USER_DATA_ERROR, GET_CAPTCHA_URL, GET_CAPTCHA_URL_ERROR, LOGIN, LOGIN_ERROR, LOGOUT, LOGOUT_ERROR } from './../reducers/constants';
import { securityAPI, CaptchaUrlResponseType } from './../../api/security-api';
import { authAPI, LoginResponseDataType, MeResponseDataType } from './../../api/auth-api'
import { call, fork, put, takeEvery, all, select, cancel, cancelled, take } from '@redux-saga/core/effects'
import { APIResponseType, ResultCodesEnum } from '../../api/api'
import { actions } from '../reducers/auth-reducer'


//* WORKERS ===================================================================================================================================

type ActionType = {
    payload: {
        email: string
        password: string
        rememberMe: boolean
        captcha: string
    }
    navigate: any
}

export function* getAuthUserData(): any {
    try {
        const res: APIResponseType<MeResponseDataType> = yield call(authAPI.me)

        if (res.resultCode === ResultCodesEnum.Success) {
            const { id, login, email } = res.data
            yield put(actions.setAuthUserData(id, email, login, true))
        }
    } catch {
        yield put({ type: GET_AUTH_USER_DATA_ERROR, error: 'Error fetching get auth user data' })
    }
}

export function* getCaptchaUrl(): any {
    try {
        const res: CaptchaUrlResponseType = yield call(securityAPI.getCaptchaUrl)
        const captchaUrl = res.url

        yield put(actions.getCaptchaUrlSuccess(captchaUrl))
    } catch {
        yield put({ type: GET_CAPTCHA_URL_ERROR, error: 'Error fetching get captcha url' })
    }
}

export function* login(action: ActionType | any): any {
    const { email, password, rememberMe, captcha } = action.payload
    const res: APIResponseType<LoginResponseDataType> = yield call(authAPI.login, email, password, rememberMe, captcha)

    try {
        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.getAuthUserData())
        } else {
            if (res.resultCode === ResultCodesEnum.CaptchaIsRequired) {
                yield put(actions.getCaptchaUrl())
            }
        }
    } catch {
        const message = res.messages.length > 0 ? res.messages[0] : 'Some Error'
        yield put({ type: LOGIN_ERROR, error: `Error fetching login, ${message}` })
    }
}

export function* logout(action: ActionType | any): any {
    try {
        const res: APIResponseType = yield call(authAPI.logout)

        if (res.resultCode === ResultCodesEnum.Success) {
            yield put(actions.setAuthUserData(null, null, null, false))
            action.navigate('/login')
        }
    } catch {
        yield put({ type: LOGOUT_ERROR, error: 'Error fetching logout' })
    }
}

//* ============================================================================================================================================


//* WATCHERS ===================================================================================================================================

export function* watchGetAuthUserData() {
    yield takeEvery(GET_AUTH_USER_DATA, getAuthUserData)
}

export function* watchGetCaptchaUrl() {
    yield takeEvery(GET_CAPTCHA_URL, getCaptchaUrl)
}

export function* watchLogin() {
    yield takeEvery(LOGIN, login)
}

export function* watchLogout(): any {
    yield takeEvery(LOGOUT, logout)
}

//* ============================================================================================================================================


export function* authRootSaga() {
    yield all([
        watchGetAuthUserData(),
        watchGetCaptchaUrl(),
        watchLogin(),
        watchLogout()
    ])
}