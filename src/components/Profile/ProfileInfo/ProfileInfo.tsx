import { ChangeEvent, FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { savePhoto, saveProfile } from '../../../redux/profile-reducer'
import { getProfile } from '../../../redux/profile-selectors'
import { useAppDispatch } from '../../../redux/redux-store'
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

    let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(savePhoto(e.target.files[0]))
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        // todo: remove then
        // @ts-ignore
        dispatch(saveProfile(formData)).then(() => {
            setEditMode(false) //* Якщо всі дані будуть введені правильно і помилок не буде - режим редагування виключиться, якщо ні то виведеться помилка під формою
        }
        )
    }

    return (
        <div className='profile__body'>
            <div className='profile__about'>
                <div className='profile__img info'>
                    <img src={profile.photos.large || userImg} width='150' height='150' alt='' />
                </div>
                <div className='avatar__change'>
                    {isOwner && <input type={'file'} onChange={onMainPhotoSelected}></input>}
                </div>
                <ProfileStatus isOwner={isOwner} />
            </div>
            {/* {editMode
                ? <ProfileDataFormRedux initialValues={profile} profile={profile}
                    outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
            } */}
            {editMode
                ? <ProfileDataForm outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />
            }
        </div>
    )
})