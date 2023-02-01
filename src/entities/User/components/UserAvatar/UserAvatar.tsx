import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../../../entities/User/index'

const userImg = require('../../../../shared/assets/avatar.png')

type PropsType = {
    user: UserType
}

export const UserAvatar: FC<PropsType> = memo(({ user }) => {
    return (
        <div className='user__avatar'>
            <NavLink to={'/profile/' + user.id}>
                <img src={user.photos.small != null ? user.photos.small : userImg} width='80' height='80' alt='' />
            </NavLink>
        </div>
    )
})