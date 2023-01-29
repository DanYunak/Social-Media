import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { actions, FilterType } from '../../redux/reducers/users-reducer'
import { useAppDispatch } from '../../redux/redux-store'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/selectors/users-selectors'
import { UserType } from '../../redux/types/types'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import './Users.css'
import { UsersSearchForm } from './UsersSearchForm'

type GetItemsType = {
    items: UserType[]
    totalCount: number
    error: string | null
}

const Users: FC = memo(() => {

    const users = useSelector(getUsers)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const filter = useSelector(getUsersFilter)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(actions.requestUsers(currentPage, pageSize, filter))
    }, [])


    const useNavigateSearch = () => {
        const navigate = useNavigate()
        return (pathname: any, params: any) => navigate(`${pathname}?${createSearchParams(params)}`)
    }

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
                currentPage={currentPage} onPageChanged={onPageChanged} portionSize={10} />

            {
                users.map(u =>
                    <User key={u.id} user={u} />
                )
            }
        </div>
    )
})

export default Users   