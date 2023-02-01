import { ADD_POST, DELETE_POST, GET_STATUS, GET_USER_PROFILE, SAVE_PHOTO, SAVE_PHOTO_SUCCESS, SAVE_PROFILE, SET_STATUS, SET_USER_PROFILE, UPDATE_STATUS } from '../consts'
import { PhotosType, ProfileType } from './types'


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