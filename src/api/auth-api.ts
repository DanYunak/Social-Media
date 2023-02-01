import { APIResponseType, instance } from '../shared/api/axiosInstance'

export type MeResponseDataType = {
    id: number
    email: string
    login: string
}

export type LoginResponseDataType = {
    userId: number
}

type LogoutResponseDataType = {
}

type GetPhotosResponseType = {
    photos: {
        small: string
        large: string
    }
}

export const authAPI = {
    me() {
        return instance.get<APIResponseType<MeResponseDataType>>(`auth/me`).then(res => res.data)
    },
    login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        return instance.post<APIResponseType<LoginResponseDataType>>('auth/login', { email, password, rememberMe, captcha }).then(
            res => res.data
        )
    },
    logout() {
        return instance.delete<APIResponseType<LogoutResponseDataType>>('auth/login').then(res => res.data)
    },
    getSmallPhoto(authorizedId: number | null) {
        return instance.get<GetPhotosResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${authorizedId}`).then(res => res.data.photos)
    }
}