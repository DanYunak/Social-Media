import { getAuthorizedId } from './../redux/profile-selectors';
import { useSelector } from 'react-redux';
import { ProfileType } from './../redux/types/types'
import { ResultCodesEnum, instance, APIResponseType } from './api'


type UpdateStatusDataType = {
    status: string
}

type SaveProfileResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: ProfileType
}

type SavePhotoDataType = {
    photos: {
        small: string
        large: string
    }
}

type GetUserPhotosResponseType = {
    photos: {
        small: string
        large: string
    }
}

export const profileAPI = {
    getProfile(userId: number | string | null | undefined) {
        return instance.get<ProfileType>(`profile/` + userId)
    },
    getStatus(userId: number | string | null | undefined) {
        return instance.get<string>(`profile/status/` + userId)
    },
    updateStatus(status: string) {
        return instance.put<APIResponseType<UpdateStatusDataType>>(`profile/status`, { status: status }).then(res => res.data)
    },
    savePhoto(file: any) {
        const formData = new FormData()
        formData.append('image', file)

        return instance.put<APIResponseType<SavePhotoDataType>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => res.data)
    },
    saveProfile(profile: ProfileType) {
        return instance.put<APIResponseType<SaveProfileResponseType>>(`profile`, profile).then(res => res.data)
    }
}