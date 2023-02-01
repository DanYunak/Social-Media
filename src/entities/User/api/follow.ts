import { APIResponseType, instance } from '../../../shared/api/axiosInstance'

export const followAPI = (userId: number) => {
    return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
}