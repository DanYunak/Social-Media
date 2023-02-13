import { CheckOutlined, ChromeOutlined, CloseOutlined, CodeOutlined, FacebookOutlined, GithubOutlined, IdcardOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../../../app/model/app-selectors'
import { eng } from '../../../../../shared/constants/languageConsts'
import { ContactsType, getProfile } from '../../../index'
import './ProfileData.css'

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
            <div className='profile__fullname info'>
                <b style={{ marginRight: 5 }}>
                    {language === eng ? 'Fullname' : `Повне ім'я`}:
                </b>
                {profile?.fullName}
            </div>
            {isOwner && <div className='edit__btn'>
                <Button type='primary' size='middle' onClick={goToEditMode}>
                    {language === eng ? 'Edit' : 'Редагувати'}
                </Button>
            </div>}
            <div className='profile__job info'>
                <div className='job__category'>
                    <b>
                        {language === eng ? 'Job' : 'Робота'}:
                    </b>
                    <div className='profile__job_looking info'>
                        <span style={{ marginRight: 5 }}>
                            {language === eng ? 'Looking' : 'В пошуках роботи'}:
                        </span>
                        {profile?.lookingForAJob ? <CheckOutlined /> : <CloseOutlined />}
                    </div>
                    <div className='profile__job_description info'>
                        <div style={{ marginRight: 5, display: 'flex', alignItems: 'center' }}>
                            <CodeOutlined style={{ marginRight: 5, fontSize: '125%' }} />
                            {language === eng ? 'My skills' : 'Мої скіли'}:
                        </div>
                        <div className='about__user'>
                            {profile?.lookingForAJobDescription}
                        </div>
                    </div>
                    <div className='profile__aboutMe info'>
                        <div style={{ marginRight: 5, display: 'flex', alignItems: 'center' }}>
                            <IdcardOutlined style={{ marginRight: 5, fontSize: '125%' }} />
                            {language === eng ? 'About me' : 'Про мене'}:
                        </div>
                        <div className='about__user'>
                            {profile?.aboutMe}
                        </div>
                    </div>
                </div>
            </div>
            <div className='profile__contancts info'>
                <div className='contacts' style={{ marginTop: 40 }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i>
                            {language === eng ? 'Contacts' : 'Контакти'}:
                        </i>
                        {!contacts && <Button type='primary' className='show__more_btn' size='middle' onClick={() => showContacts(true)}
                            style={{ marginLeft: 10 }}>
                            {language === eng ? 'Show More' : 'Детальніше'}
                        </Button>
                        }
                        {contacts && <Button type='primary' size='middle' danger onClick={() => showContacts(false)}
                            style={{ marginLeft: 10 }}>
                            {language === eng ? 'Show Less' : 'Згорнути'}
                        </Button>
                        }
                    </div>
                    {contacts &&
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                            {
                                Object
                                    // @ts-ignore
                                    .keys(profile?.contacts)
                                    .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу по кожному елементу замапиться і відмальє компоненту Contact
                                        return (
                                            <Contact contactTitle={key} key={key} contactValue={profile?.contacts[key as keyof ContactsType]} />
                                        )
                                    })
                            }
                        </div>
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
        <div className='contact__item' style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
            {contactTitle === 'github' &&
                <div>
                    <GithubOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
            {contactTitle === 'facebook' &&
                <div>
                    <FacebookOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
            {contactTitle === 'twitter' &&
                <div>
                    <TwitterOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
            {contactTitle === 'instagram' &&
                <div>
                    <InstagramOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
            {contactTitle === 'youtube' &&
                <div>
                    <YoutubeOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
            {contactTitle === 'website' &&
                <div style={{ marginBottom: -5 }}>
                    <ChromeOutlined style={{ marginRight: 5 }} /><b>{contactTitle}:</b> {contactValue}
                </div>
            }
        </div>
    )
})