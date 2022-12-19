import { ChangeEvent, FC, memo, useState } from 'react'
import { GithubOutlined, FacebookOutlined, TwitterOutlined, ChromeOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons'
import './ProfileInfo.css'
import { ContactsType, ProfileType } from '../../../redux/types/types'
import ProfileDataFormRedux from './ProfileDataForm'
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import Preloader from '../../common/Preloader/Preloader'
import { Button } from 'antd'
const userImg = require('../../../assets/images/avatar.png')


type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean

    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => any
}

const ProfileInfo: FC<PropsType> = memo(({ profile, status, updateStatus, isOwner, savePhoto, saveProfile }) => {

    let [editMode, setEditMode] = useState(false)

    if (!profile) {
        return (
            <Preloader />
        )
    }

    let onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData: ProfileType) => {
        // todo: remove then
        saveProfile(formData).then(() => {
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
                <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            </div>
            {editMode
                ? <ProfileDataFormRedux initialValues={profile} profile={profile}
                    outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}

        </div>
    )
})

type ProfileDataPropsType = {
    profile: ProfileType | null
    isOwner: boolean
    goToEditMode: () => void
}


const ProfileData: FC<ProfileDataPropsType> = memo(({ profile, isOwner, goToEditMode }) => {

    const [contacts, showContacts] = useState(false)

    return (
        <div className='profile__info'>
            <div className='profile__fullname info'><b>Fullname</b>: {profile?.fullName}</div>
            {isOwner && <div className='edit__btn'>
                <Button type='primary' onClick={goToEditMode}>Edit</Button>
            </div>}
            <div className='profile__job info'>
                <div className='job__category'><b>Job:</b>
                    <div className='profile__job_looking info'><span>Looking:</span> {profile?.lookingForAJob ? 'yes' : 'no'}</div>
                    <div className='profile__job_description info'><span>My skills:</span> {profile?.lookingForAJobDescription}</div>
                    <div className='profile__aboutMe info'><span>About me:</span> {profile?.aboutMe}</div>
                </div>
            </div>
            <div className='profile__contancts info'>
                <div className='contacts' style={{ marginTop: 40 }}><i>Contacts:</i>
                    {!contacts && <Button type='primary' onClick={() => showContacts(true)}
                        style={{ marginLeft: 10 }}>Show More</Button>}
                    {contacts && <Button type='primary' danger onClick={() => showContacts(false)}
                        style={{ marginLeft: 10 }}>Show Less</Button>}
                    {contacts &&
                        <div>
                            {
                                Object
                                    // @ts-ignore
                                    .keys(profile?.contacts)
                                    .map((key) => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу по кожному елементу замапиться і відмальє компоненту Contact
                                        return (
                                            <Contact contactTitle={key} key={key} contactValue={profile?.contacts[key as keyof ContactsType]} />
                                        )
                                    })
                            }</div>
                    }
                </div>
            </div>
        </div>
    )
})

type ContactsPropsType = {
    contactTitle: string
    contactValue: string | undefined
}

const Contact: FC<ContactsPropsType> = memo(({ contactTitle, contactValue }) => {
    return (
        <div className='contact__item'>
            {contactTitle === 'github' &&
                <div>
                    <GithubOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
            {contactTitle === 'facebook' &&
                <div>
                    <FacebookOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
            {contactTitle === 'twitter' &&
                <div>
                    <TwitterOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
            {contactTitle === 'instagram' &&
                <div>
                    <InstagramOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
            {contactTitle === 'youtube' &&
                <div>
                    <YoutubeOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
            {contactTitle === 'website' &&
                <div>
                    <ChromeOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>}
        </div>
    )
})

export default ProfileInfo