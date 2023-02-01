import { instance, APIResponseType } from '../../../shared/api/axiosInstance'

type UpdateStatusDataType = {
    status: string
}

export const updateStatusAPI = (status: string) => {
    return instance.put<APIResponseType<UpdateStatusDataType>>(`profile/status`, { status: status })
        .then(res => res.data)
}