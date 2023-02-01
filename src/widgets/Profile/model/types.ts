export type ContactsType = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
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

export type AddPostValueType = {
    newPostBody: string
}