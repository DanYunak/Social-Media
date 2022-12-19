import { ThunkAction } from 'redux-thunk'
import { AppStateType } from '../redux-store'


export type PostType = {
    id: number
    message: string
    likes: number
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    newPostBody: ''
    aboutMe: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    message: string
}

// @ts-ignore
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> // ActionsTypes - types of action creators in file