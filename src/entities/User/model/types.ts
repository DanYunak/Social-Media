import { PhotosType } from './../../../widgets/Profile/index'

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}