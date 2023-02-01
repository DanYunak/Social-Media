import { FC, memo } from 'react'
import { NavLink } from 'react-router-dom'
import { UserType } from '../../../../entities/User/index'
import './UserInfo.css'


type PropsType = {
    user: UserType
}

export const UserInfo: FC<PropsType> = memo(({ user }) => {
    return (
        <div className='user__info'>
            <div className='user__name'>
                <NavLink to={'/profile/' + user.id}>{user.name}</NavLink>
            </div>
            <div className='user__status'>{user.status}</div>
        </div>
    )
})