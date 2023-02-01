import { CHANGE_LANGUAGE_ERROR, INITIALIZE_APP_ERROR } from '../../app/consts'
import { FOLLOW_ERROR, UNFOLLOW_ERROR } from '../../entities/User'
import { SEND_MESSAGE_ERROR, START_MESSAGES_LISTENING_ERROR, STOP_MESSAGES_LISTENING_ERROR } from '../../widgets/Chat/consts'
import { SAVE_PHOTO_ERROR, SAVE_PROFILE_ERROR, SET_USER_PROFILE_ERROR, SET_USER_STATUS_ERROR, UPDATE_USER_STATUS_ERROR } from '../../widgets/Profile'
import { REQUEST_USERS_ERROR } from '../../widgets/Users'
import { GET_AUTH_USER_DATA_ERROR, GET_CAPTCHA_URL_ERROR, LOGIN_ERROR, LOGOUT_ERROR } from '../reducers/constants'

export const actions = {
    userProfileError: (error: string) => ({ type: SET_USER_PROFILE_ERROR, error } as const),
    userStatusError: (error: string) => ({ type: SET_USER_STATUS_ERROR, error } as const),
    updateUserStatusError: (error: string) => ({ type: UPDATE_USER_STATUS_ERROR, error } as const),
    saveProfileError: (error: string) => ({ type: SAVE_PROFILE_ERROR, error } as const),
    savePhotoError: (error: string) => ({ type: SAVE_PHOTO_ERROR, error } as const),

    requestUsersError: (error: string) => ({ type: REQUEST_USERS_ERROR, error } as const),
    followError: (error: string) => ({ type: FOLLOW_ERROR, error } as const),
    unfollowError: (error: string) => ({ type: UNFOLLOW_ERROR, error } as const),

    getAuthUserDataError: (error: string) => ({ type: GET_AUTH_USER_DATA_ERROR, error } as const),
    getCaptchaUrlError: (error: string) => ({ type: GET_CAPTCHA_URL_ERROR, error } as const),
    loginError: (error: string) => ({ type: LOGIN_ERROR, error } as const),
    logoutError: (error: string) => ({ type: LOGOUT_ERROR, error } as const),

    startMessagesListeningError: (error: string) => ({ type: START_MESSAGES_LISTENING_ERROR, error } as const),
    stopMessagesListeningError: (error: string) => ({ type: STOP_MESSAGES_LISTENING_ERROR, error } as const),
    sendMessageError: (error: string) => ({ type: SEND_MESSAGE_ERROR, error } as const),

    initializeAppError: (error: string) => ({ type: INITIALIZE_APP_ERROR, error } as const),
    changeLanguageError: (error: string) => ({ type: CHANGE_LANGUAGE_ERROR, error } as const)
}