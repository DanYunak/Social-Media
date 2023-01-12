import axios from 'axios'
import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { createSearchParams, useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/redux-store'
import { FilterType, follow, requestUsers, unfollow } from '../../redux/users-reducer'
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/users-selectors'
import Paginator from '../common/Paginator/Paginator'
import User from './User'
import './Users.css'
import { UsersSearchForm } from './UsersSearchForm'
import { UserType } from '../../redux/types/types'

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
    const followingInProgress = useSelector(getFollowingInProgress)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestUsers(currentPage, pageSize, filter))
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
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
    }, [location.search])

    const onPageChanged = (pageNumber: number) => {
        dispatch(requestUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    const onFollow = (userId: number) => {
        dispatch(follow(userId))
    }

    const onUnfollow = (userId: number) => {
        dispatch(unfollow(userId))
    }

    return (
        <div className='user__wrapper'>

            <UsersSearchForm onFilterChanged={onFilterChanged} />

            <Paginator totalUsersCount={totalUsersCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} portionSize={10} />

            {
                users.map(u =>
                    <User key={u.id} user={u} followingInProgress={followingInProgress}
                        unfollow={onUnfollow} follow={onFollow} />
                )
            }
        </div>
    )
})

export default Users   