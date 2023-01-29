import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import Users from './Users'
import Preloader from '../common/Preloader/Preloader.jsx'
import { getIsFetching } from '../../redux/selectors/users-selectors'

export const UsersPage: FC = memo(() => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
})