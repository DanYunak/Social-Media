import { instance } from '../../../shared/api/axiosInstance'
import { ProfileType } from '../model/types'

export const getProfileAPI = (userId: number | string | null | undefined) => {
    return instance.get<ProfileType>(`profile/${userId}`)
}