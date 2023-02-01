import { UserType } from './../../../entities/User/model/types'
import { InferActionsTypes } from '../../../redux/redux-store'
import { actions } from './users-actions'

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 50,
    currentPage: 3000,
    isFetching: false,
    followingInProgress: [] as Array<number>, //* Коли йде підписка потрібно закидувати в масив id користувача, коли відписка - то забирати (array of users ids)
    filter: {
        term: '',
        friend: null as null | boolean | string
    }
}

export type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>

export type FilterType = typeof initialState.filter

export const usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'USERS/FOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(u => { //* Map створює масив на основі минулого масиву, це хороший варіант для зміни даних, для додавання чогось в масив map можна не використовувати, а просто копіювати масив
                    if (u.id === action.userId) { //* Коли map пробігається по масиву і в елементі є action.userId (action при якому потрібно зафоловити користувача, ф-ція внизу в експорті)
                        return { ...u, followed: true } //* Якщо id співпадає то повертає копію і змінює стан підписки, якщо ні, то повертає оригінал без змін
                    }
                    return u
                })
            }

        case 'USERS/UNFOLLOW_SUCCESS':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return { ...u, followed: false }
                    }
                    return u
                })
            }

        case 'USERS/SET_USERS':
            return {
                ...state,
                users: [...action.users]
            }

        case 'USERS/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage
            }

        case 'USERS/SET_TOTAL_USERS_COUNT':
            return {
                ...state,
                totalUsersCount: action.usersTotalCount
            }

        case 'USERS/SET_FILTER':
            return { ...state, filter: action.payload }

        case 'USERS/TOGGLE_IS_FETCHING':
            return {
                ...state,
                isFetching: action.isFetching
            }

        case 'USERS/TOGGLE_IS_FOLLOWING_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id != action.userId)
            }

        default:
            return state
    }
}

//* ACTION CREATORS ==================================================================================================================



//* ===============================================================================================================================================

export default usersReducer