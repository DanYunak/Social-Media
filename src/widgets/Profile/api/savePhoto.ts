import { instance, APIResponseType } from '../../../shared/api/axiosInstance'

export type SavePhotoDataType = {
    photos: {
        small: string
        large: string
    }
}

export const savePhotoAPI = (file: any) => {
    const formData = new FormData()
    formData.append('image', file)

    return instance.put<APIResponseType<SavePhotoDataType>>(`profile/photo`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then(res => res.data)
}