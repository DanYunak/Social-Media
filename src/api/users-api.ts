import { UserType } from '../redux/types/types';
import { instance, APIResponseType } from './api';

type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10, term: string = '', friend: boolean | string | null = null) {
        return (
            instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}&term=${term}`
                + (friend === 'null' ? '' : `&friend=${friend}`))
                .then(res => res.data)
        )
    },
    follow(userId: number) {
        return instance.post<APIResponseType>(`follow/${userId}`).then(res => res.data)
    },
    unfollow(userId: number) {
        return instance.delete<APIResponseType>(`follow/${userId}`).then(res => res.data)
    }
}