import { instance } from '../shared/api/axiosInstance'


export type CaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<CaptchaUrlResponseType>(`security/get-captcha-url`).then(res => res.data)
    }
}