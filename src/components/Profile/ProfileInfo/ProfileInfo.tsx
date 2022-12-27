import { ChromeOutlined, FacebookOutlined, GithubOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { ChangeEvent, FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getUserLogin } from '../../../redux/auth-selectors'
import { savePhoto, saveProfile } from '../../../redux/profile-reducer'
import { getProfile } from '../../../redux/profile-selectors'
import { useAppDispatch } from '../../../redux/redux-store'
import { ContactsType, ProfileType } from '../../../redux/types/types'
import Preloader from '../../common/Preloader/Preloader'
import ProfileDataFormRedux from './ProfileDataForm'
import './ProfileInfo.css'
import { ProfileStatus } from './ProfileStatus'
const userImg = require('../../../assets/images/avatar.png')


type PropsType = {
    isOwner: boolean
}

const ProfileInfo: FC<PropsType> = memo(({ isOwner }) => {

    let [editMode, setEditMode] = useState(false)

    const profile = useSelector(getProfile)
    const login = useSelector(getUserLogin)

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
            {editMode
                ? <ProfileDataFormRedux initialValues={profile} profile={profile}
                    outFromEditMode={() => { setEditMode(false) }} onSubmit={onSubmit} />
                : <ProfileData isOwner={isOwner} goToEditMode={() => { setEditMode(true) }} />}

        </div>
    )
})

type ProfileDataPropsType = {
    isOwner: boolean
    goToEditMode: () => void
}


const ProfileData: FC<ProfileDataPropsType> = memo(({ isOwner, goToEditMode }) => {

    const [contacts, showContacts] = useState(false)

    const profile = useSelector(getProfile)

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
                                    .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу по кожному елементу замапиться і відмальє компоненту Contact
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