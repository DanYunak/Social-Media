import { ResultCodesEnum } from './../api/api'
import { profileAPI } from '../api/profile-api'
import { FormAction, stopSubmit } from 'redux-form'
import { PostType, PhotosType, ProfileType } from './types/types'
import { InferActionsTypes, BaseThunkType } from './redux-store'

let initialState = { //? Одноразовий об'єкт, у випадку яку в profileReducer не прийде state, то він ним і буде локально, щоб не видавало помилку
    postsData: [
        { id: 1, message: 'Hello', likes: 24 },
        { id: 2, message: 'Please visit my acc', likes: 0 },
        { id: 3, message: 'Are you OK?', likes: 5 },
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'PROFILE/ADD_POST':
            let newPost = {
                id: 5,
                message: action.newPostBody,
                likes: 0
            }
            return {
                ...state,
                postsData: [...state.postsData, newPost],
            }
        case 'PROFILE/DELETE_POST':
            return {
                ...state,
                postsData: state.postsData.filter(p => p.id != action.postId) //? ті айдішніки постів які не дорівннють postId в action creator проходять далі і залишаються
            }
        case 'PROFILE/SET_USER_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        case 'PROFILE/SET_STATUS':
            return {
                ...state,
                status: action.status
            }
        case 'PROFILE/SAVE_PHOTO_SUCCESS':
            return {
                ...state,
                profile: { ...state.profile, photos: action.photos } as ProfileType,
            }
        default:
            return state
    }
}

//* ACTION CREATORS =========================================================================================================

type ActionsTypes = InferActionsTypes<typeof actions>

export const actions = {
    addPost: (newPostBody: string) => ({ type: 'PROFILE/ADD_POST', newPostBody } as const),

    deletePost: (postId: number) => ({ type: 'PROFILE/DELETE_POST', postId } as const),

    setUserProfile: (profile: ProfileType) => ({ type: 'PROFILE/SET_USER_PROFILE', profile } as const),

    setStatus: (status: string) => ({ type: 'PROFILE/SET_STATUS', status } as const),

    savePhotoSuccess: (photos: PhotosType) => ({ type: 'PROFILE/SAVE_PHOTO_SUCCESS', photos } as const) //? photos, бо з сервера приходять два варіанти одного фото - small i large
}


//*============================================================================================================================================================================



//* THUNKS =========================================================================================================

export const getUserProfile = (userId: number | string | null | undefined): ThunkType => async (dispatch) => {

    const response = await profileAPI.getProfile(userId)
    dispatch(actions.setUserProfile(response.data))
}

export const getStatus = (userId: number | string | null | undefined): ThunkType => async (dispatch) => {

    const response = await profileAPI.getStatus(userId)
    dispatch(actions.setStatus(response.data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {

    const updateStatusData = await profileAPI.updateStatus(status)

    if (updateStatusData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.setStatus(status))
    }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {

    const savePhotoData = await profileAPI.savePhoto(file)

    if (savePhotoData.resultCode === ResultCodesEnum.Success) {
        dispatch(actions.savePhotoSuccess(savePhotoData.data.photos))
    }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
    const saveProfileData = await profileAPI.saveProfile(profile)
    const userId = getState().auth.id

    if (saveProfileData.resultCode === ResultCodesEnum.Success) {
        if (userId != null) {
            dispatch(getUserProfile(userId))
        } else {
            throw new Error(`userId can't be null`)
        }
    } else {
        dispatch(stopSubmit('edit_profile', { _error: saveProfileData.messages[0] }))
        return Promise.reject(saveProfileData.messages[0])
    }
}

//*============================================================================================================================================================================


export default profileReducer