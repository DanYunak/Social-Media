import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getIsFetching } from '../../../widgets/Users/model/users-selectors'
import { Preloader } from '../../../shared/components/Preloader/Preloader'
import { Users } from '../../../widgets/Users/index'

export const UsersPage: FC = memo(() => {

    const isFetching = useSelector(getIsFetching)

    return (
        <>
            {isFetching ? <Preloader /> : null}
            <Users />
        </>
    )
})