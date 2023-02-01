import { ChromeOutlined, FacebookOutlined, GithubOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../../../app/model/app-selectors'
import { ContactsType, getProfile } from '../../../index'

export type ProfileDataPropsType = {
    isOwner: boolean
    goToEditMode: () => void
}

export const ProfileData: FC<ProfileDataPropsType> = memo(({ isOwner, goToEditMode }) => {

    const [contacts, showContacts] = useState(false)

    const profile = useSelector(getProfile)
    const language = useSelector(getLanguage)

    return (
        <div className='profile__info'>
            <div className='profile__fullname info'><b>{language === 'english' ? 'Fullname' : `Повне ім'я`}</b>: {profile?.fullName}</div>
            {isOwner && <div className='edit__btn'>
                <Button type='primary' onClick={goToEditMode}>{language === 'english' ? 'Edit' : 'Редагувати'}</Button>
            </div>}
            <div className='profile__job info'>
                <div className='job__category'><b>{language === 'english' ? 'Job' : 'Робота'}:</b>
                    <div className='profile__job_looking info'><span style={{ marginRight: 10 }}>{language === 'english' ? 'Looking' : 'В пошуках роботи'}:</span>
                        {profile?.lookingForAJob ? <CheckOutlined /> : <CloseOutlined />}</div>
                    <div className='profile__job_description info'><span>{language === 'english' ? 'My skills' : 'Мої скіли'}:</span> {profile?.lookingForAJobDescription}</div>
                    <div className='profile__aboutMe info'><span>{language === 'english' ? 'About me' : 'Про мене'}:</span> {profile?.aboutMe}</div>
                </div>
            </div>
            <div className='profile__contancts info'>
                <div className='contacts' style={{ marginTop: 40 }}><i>{language === 'english' ? 'Contacts' : 'Контакти'}:</i>
                    {!contacts && <Button type='primary' onClick={() => showContacts(true)}
                        style={{ marginLeft: 10 }}>{language === 'english' ? 'Show More' : 'Детальніше'}</Button>}
                    {contacts && <Button type='primary' danger onClick={() => showContacts(false)}
                        style={{ marginLeft: 10 }}>{language === 'english' ? 'Show Less' : 'Згорнути'}</Button>}
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

export const Contact: FC<ContactsPropsType> = memo(({ contactTitle, contactValue }) => {
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