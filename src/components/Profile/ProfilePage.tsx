import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom'
import { getStatus, getUserProfile } from '../../redux/profile-reducer'
import { getAuthorizedId } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import Profile from './Profile'

export const ProfilePage: FC = memo(() => {

    const authorizedId = useSelector(getAuthorizedId)

    const dispatch = useAppDispatch()

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const match = { params: useParams() }
    let userId = match.params.userIdde

    const refreshProfile = () => {
        if (!userId) {
            // @ts-ignore
            userId = authorizedId
            if (!userId) {
                navigate('/login')
            }
        }

        dispatch(getUserProfile(userId))
        dispatch(getStatus(userId))
    }

    useEffect(() => {
        refreshProfile()
    }, [pathname])

    return (
        <Profile isOwner={!match.params.userIdde} />
    )
})