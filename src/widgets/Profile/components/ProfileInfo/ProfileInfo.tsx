import { Input } from 'antd'
import { ChangeEvent, FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { ProfileDataForm } from '../../../../features/ProfileDataForm/index'
import { useAppDispatch } from '../../../../redux/redux-store'
import { ProfileType } from '../../model/types'
import { Preloader } from '../../../../shared/components/Preloader/Preloader'
import { actions } from '../../model/profile-actions'
import { getProfile } from '../../model/profile-selectors'
import { ProfileData } from './ProfileData/ProfileData'
import './ProfileInfo.css'
import { ProfileStatus } from './ProfileStatus/ProfileStatus'
import { AvatarChange } from '../../../../features/AvatarChange'
import { ProfileImg } from '../ProfileImg/ProfileImg'

const userImg = require('../../../../shared/assets/avatar.png')

type PropsType = {
    isOwner: boolean
}

export const ProfileInfo: FC<PropsType> = memo(({ isOwner }) => {

    let [editMode, setEditMode] = useState(false)

    const profile = useSelector(getProfile)

    const dispatch = useAppDispatch()

    if (!profile) {
        return (
            <Preloader />
        )
    }

    const onSubmit = async (formData: ProfileType) => {
        dispatch(actions.saveProfile(formData))
        setEditMode(false)
    }

    return (
        <div className='profile__body'>
            <div className='profile__about'>
                <ProfileImg />
                <AvatarChange isOwner={isOwner} />
                <ProfileStatus isOwner={isOwner} />
            </div>
            {editMode
                ? <ProfileDataForm outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
            }
        </div>
    )
})