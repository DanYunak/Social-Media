import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom'
import { actions } from '../../redux/reducers/profile-reducer'
import { useAppDispatch } from '../../redux/redux-store'
import { getAuthorizedId } from '../../redux/selectors/profile-selectors'
import Profile from './Profile'

export const ProfilePage: FC = memo(() => {

    const authorizedId = useSelector(getAuthorizedId)

    const dispatch = useAppDispatch()

    const { pathname } = useLocation()
    const navigate = useNavigate()

    const refreshProfile = () => {
        if (!userId) {
            // @ts-ignore
            userId = authorizedId
            if (!userId) {
                navigate('/login')
            }
        }

        dispatch(actions.getUserProfile(userId))
        dispatch(actions.getStatus(userId))
    }
    const match = { params: useParams() }
    let userId = match.params.userIdde


    useEffect(() => {
        refreshProfile()
    }, [pathname])

    return (
        <Profile isOwner={!match.params.userIdde} />
    )
})