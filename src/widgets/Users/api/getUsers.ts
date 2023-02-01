import { UserType } from './../../../entities/User/model/types'
import { instance } from '../../../shared/api/axiosInstance'

export type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const getUsersAPI = (currentPage = 1, pageSize = 10, term: string = '', friend: boolean | string | null = null) => {
    return (
        instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
            + (friend === 'null' ? '' : `&friend=${friend}`))
            .then(res => res.data)
    )
}