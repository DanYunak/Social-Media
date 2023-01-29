import { ADD_POST, DELETE_POST, GET_STATUS, GET_USER_PROFILE, SET_USER_PROFILE, SET_STATUS, UPDATE_STATUS, SAVE_PHOTO, SAVE_PHOTO_SUCCESS, SAVE_PROFILE } from './constants';
import { ResultCodesEnum } from '../../api/api'
import { profileAPI } from '../../api/profile-api'
import { FormAction, stopSubmit } from 'redux-form'
import { PostType, PhotosType, ProfileType } from '../types/types'
import { InferActionsTypes, BaseThunkType } from '../redux-store'

let initialState = { //? Одноразовий об'єкт, у випадку яку в profileReducer не прийде state, то він ним і буде локально, щоб не видавало помилку
    postsData: [
        { id: 1, message: 'Hello', likes: 24 },
        { id: 2, message: 'Please visit my acc', likes: 0 },
        { id: 3, message: 'Are you OK?', likes: 5 },
    ] as PostType[],
    profile: null as ProfileType | null,
    status: ''
}

export type InitialStateType = typeof initialState

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
    addPost: (newPostBody: string) => ({ type: ADD_POST, newPostBody } as const),

    deletePost: (postId: number) => ({ type: DELETE_POST, postId } as const),

    getUserProfile: (userId: string | undefined) => ({ type: GET_USER_PROFILE, userId } as const),
    setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile } as const),

    getStatus: (userId: string | undefined) => ({ type: GET_STATUS, userId } as const),
    setStatus: (status: string) => ({ type: SET_STATUS, status } as const),
    updateStatus: (status: string) => ({ type: UPDATE_STATUS, status } as const),

    savePhoto: (file: File) => ({ type: SAVE_PHOTO, file } as const),
    savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos } as const), //? photos, бо з сервера приходять два варіанти одного фото - small i large

    saveProfile: (profile: ProfileType) => ({ type: SAVE_PROFILE, profile } as const)

}

//*============================================================================================================================================================================


export default profileReducer