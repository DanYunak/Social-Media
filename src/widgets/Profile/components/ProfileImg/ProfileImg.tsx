import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getProfile } from '../../model/profile-selectors'

const userImg = require('../../../../shared/assets/avatar.png')

export const ProfileImg: FC = memo(() => {

    const profile = useSelector(getProfile)

    return (
        <div className='profile__img info'>
            <img src={profile?.photos.large || userImg} width='150' height='150' alt='' />
        </div>
    )
})