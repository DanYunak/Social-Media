import { APIResponseType, instance } from '../../../shared/api/axiosInstance'

export const unfollowAPI = (userId: number) => {
    return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
}