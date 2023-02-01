import { actions } from '../actions/errors-actions'
import { InferActionsTypes } from '../redux-store'

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

type ActionsTypes = InferActionsTypes<typeof actions>

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
        case 'CHAT/START_MESSAGES_LISTENING_ERROR':
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
