import { InferActionsTypes } from '../redux-store';
import { FOLLOW_ERROR, GET_AUTH_USER_DATA_ERROR, GET_CAPTCHA_URL_ERROR, LOGIN_ERROR, LOGOUT_ERROR, REQUEST_USERS_ERROR, SAVE_PHOTO_ERROR, SAVE_PROFILE_ERROR, SET_USER_PROFILE_ERROR, SET_USER_STATUS_ERROR, START_MESSAGES_LISTENING, STOP_MESSAGES_LISTENING_ERROR, UNFOLLOW_ERROR, UPDATE_USER_STATUS_ERROR, SEND_MESSAGE_ERROR, INITIALIZE_APP_ERROR, CHANGE_LANGUAGE_ERROR } from './constants';

const initialState = {
    userProfileError: '',
    userStatusError: '',
    updateUserStatusError: '',
    saveProfileError: '',
    savePhotoError: '',
    requestUsersError: '',
    followError: '',
    unfollowError: '',
    getAuthUserDataError: '',
    getCaptchaUrlError: '',
    loginError: '',
    logoutError: '',
    startMessagesListeningError: '',
    stopMessagesListeningError: '',
    sendMessageError: '',
    initializeAppError: '',
    changeLanguageError: ''
}

type InitialStateType = typeof initialState

export const errorsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/SET_USER_PROFILE_ERROR':
            return {
                ...state,
                userProfileError: action.error
            }
        case 'PROFILE/SET_USER_STATUS_ERROR':
            return {
                ...state,
                userStatusError: action.error
            }
        case 'PROFILE/UPDATE_USER_STATUS_ERROR':
            return {
                ...state,
                updateUserStatusError: action.error
            }
        case 'PROFILE/SAVE_PROFILE_ERROR':
            return {
                ...state,
                saveProfileError: action.error
            }
        case 'PROFILE/SAVE_PHOTO_ERROR':
            return {
                ...state,
                savePhotoError: action.error
            }
        case 'USERS/REQUEST_USERS_ERROR':
            return {
                ...state,
                requestUsersError: action.error
            }
        case 'USERS/FOLLOW_ERROR':
            return {
                ...state,
                followError: action.error
            }
        case 'USERS/UNFOLLOW_ERROR':
            return {
                ...state,
                unfollowError: action.error
            }
        case 'AUTH/GET_AUTH_USER_DATA_ERROR':
            return {
                ...state,
                getAuthUserDataError: action.error
            }
        case 'AUTH/GET_CAPTCHA_URL_ERROR':
            return {
                ...state,
                getCaptchaUrlError: action.error
            }
        case 'AUTH/LOGIN_ERROR':
            return {
                ...state,
                loginError: action.error
            }
        case 'AUTH/LOGOUT_ERROR':
            return {
                ...state,
                logoutError: action.error
            }
        case 'CHAT/START_MESSAGES_LISTENING':
            return {
                ...state,
                startMessagesListeningError: action.error
            }
        case 'CHAT/STOP_MESSAGES_LISTENING_ERROR':
            return {
                ...state,
                stopMessagesListeningError: action.error
            }
        case 'CHAT/SEND_MESSAGE_ERROR':
            return {
                ...state,
                sendMessageError: action.error
            }
        case 'APP/INITIALIZE_APP_ERROR':
            return {
                ...state,
                initializeAppError: action.error
            }
        case 'APP/CHANGE_LANGUAGE_ERROR':
            return {
                ...state,
                changeLanguageError: action.error
            }
        default: return state
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>

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

    startMessagesListeningError: (error: string) => ({ type: START_MESSAGES_LISTENING, error } as const),
    stopMessagesListeningError: (error: string) => ({ type: STOP_MESSAGES_LISTENING_ERROR, error } as const),
    sendMessageError: (error: string) => ({ type: SEND_MESSAGE_ERROR, error } as const),

    initializeAppError: (error: string) => ({ type: INITIALIZE_APP_ERROR, error } as const),
    changeLanguageError: (error: string) => ({ type: CHANGE_LANGUAGE_ERROR, error } as const)
}