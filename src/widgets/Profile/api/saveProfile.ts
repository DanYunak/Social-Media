import { APIResponseType, instance, ResultCodesEnum } from '../../../shared/api/axiosInstance'
import { ProfileType } from '../model/types'

type SaveProfileResponseType = {
    resultCode: ResultCodesEnum
    messages: Array<string>
    data: ProfileType
}

export const saveProfileAPI = (profile: ProfileType) => {
    return instance.put<APIResponseType<SaveProfileResponseType>>(`profile`, profile).then(res => res.data)
}