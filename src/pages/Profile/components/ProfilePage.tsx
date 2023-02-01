import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
    useLocation,
    useNavigate,
    useParams
} from 'react-router-dom'
import { useAppDispatch } from '../../../redux/redux-store'
import Profile from '../../../widgets/Profile/components/Profile/Profile'
import { actions } from '../../../widgets/Profile/model/profile-actions'
import { getAuthorizedId } from '../../../widgets/Profile/model/profile-selectors'

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