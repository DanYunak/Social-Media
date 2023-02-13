import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { User } from '../../../entities/User/components/User/User'
import { UserType } from '../../../entities/User/model/types'
import { Paginator } from '../../../features/Paginator/index'
import { UsersSearchForm } from '../../../features/UsersSearchForm/index'
import { useAppDispatch } from '../../../redux/redux-store'
import { getCurrentPage, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../../widgets/Users/model/users-selectors'
import { useNavigateSearch } from '../lib/hooks/useNavigateSearch/useNavigateSearch'
import { actions } from '../model/users-actions'
import { FilterType } from '../model/users-reducer'
import './Users.css'

type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

export const Users: FC = memo(() => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.requestUsers(currentPage, pageSize, filter))
    }, [])

    const navigateSearch = useNavigateSearch()
    const location = useLocation()

    useEffect(() => {
        navigateSearch('/users', {
            page: `${currentPage}`,
            count: `${pageSize}`,
            term: `${filter.term}`,
            friend: `${filter.friend}`
        })
    }, [filter, currentPage, pageSize])

    useEffect(() => {
        const query = new URLSearchParams(location.search)

        let actualPage = currentPage
        let actualFilter = filter

        const queryFriend = query.get('friend')
        const queryPage = query.get('page')
        const queryTerm = query.get('term')

        if (queryPage) actualPage = +queryPage

        if (queryTerm) {
            actualFilter = { ...actualFilter, term: queryTerm }
        }

        switch (queryFriend) {
            case 'null':
                actualFilter = { ...actualFilter, friend: 'null' }
                break
            case 'true':
                actualFilter = { ...actualFilter, friend: 'true' }
                break
            case 'false':
                actualFilter = { ...actualFilter, friend: 'false' }
                break
            default:
                break
        }
        dispatch(actions.requestUsers(actualPage, pageSize, actualFilter))
    }, [location.search])

    const onPageChanged = (pageNumber: number) => {
        dispatch(actions.requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(actions.requestUsers(1, pageSize, filter))
    }

    return (
        <div className='user__wrapper'>

            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} portionSize={window.innerWidth >= 460 ? 10 : 5} />

            {
                users.map(u =>
                    <User key={u.id} user={u} />
                )
            }
        </div>
    )
})

export default Users   