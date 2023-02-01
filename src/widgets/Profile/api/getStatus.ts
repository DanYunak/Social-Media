import { instance } from '../../../shared/api/axiosInstance'

export const getStatusAPI = (userId: number | string | null | undefined) => {
    return instance.get<string>(`profile/status/${userId}`)
}