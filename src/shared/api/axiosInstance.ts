import axios from 'axios'

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'ad211272-c798-4f3f-bc61-e6bd6431d171'
    }
})

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}> = {
    data: D
    resultCode: ResultCodesEnum
    messages: Array<string>
}