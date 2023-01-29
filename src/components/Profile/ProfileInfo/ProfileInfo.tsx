import { Input } from 'antd'
import { ChangeEvent, FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { actions } from '../../../redux/reducers/profile-reducer'
import { useAppDispatch } from '../../../redux/redux-store'
import { getProfile } from '../../../redux/selectors/profile-selectors'
import { ProfileType } from '../../../redux/types/types'
import Preloader from '../../common/Preloader/Preloader'
import { ProfileData } from './ProfileData'
import { ProfileDataForm } from './ProfileDataForm'
import './ProfileInfo.css'
import { ProfileStatus } from './ProfileStatus'
const userImg = require('../../../assets/images/avatar.png')

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

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(actions.savePhoto(e.target.files[0]))
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        dispatch(actions.saveProfile(formData))
        setEditMode(false)
    }

    return (
        <div className='profile__body'>
            <div className='profile__about'>
                <div className='profile__img info'>
                    <img src={profile.photos.large || userImg} width='150' height='150' alt='' />
                </div>
                <div className='avatar__change'>
                    {isOwner && <Input type={'file'} onChange={onMainPhotoSelected} style={{ width: 200 }} />}
                </div>
                <ProfileStatus isOwner={isOwner} />
            </div>
            {editMode
                ? <ProfileDataForm outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
            }
        </div>
    )
})