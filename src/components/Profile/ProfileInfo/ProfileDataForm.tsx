import { Button } from 'antd'
import { Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../redux/app-selectors'
import { getProfile } from '../../../redux/profile-selectors'
import { ProfileType } from '../../../redux/types/types'
import './ProfileDataForm.css'

export type ContactsTypeKey = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
}

type PropsType = {
    outFromEditMode: () => void
    onSubmit: (formData: ProfileType) => void
}

export const ProfileDataForm: FC<PropsType> = memo(({ outFromEditMode, onSubmit }) => {

    const language = useSelector(getLanguage)
    const profile = useSelector(getProfile)

    const profileDataFormValidate = (values: any) => {
        const errors = {}
        return errors
    }

    return (
        // @ts-ignore
        <Formik initialValues={{ fullName: '', lookingForAJobDescription: '', aboutMe: '' }}
            validate={values => {
                const errors = {}
                return errors
            }} onSubmit={onSubmit} >
            {props => (
                <Form onSubmit={props.handleSubmit}>
                    <div className='profile__fullname info'><span>
                        {language === 'english' ? 'Fullname' : `Повне ім'я`}:
                    </span>
                        <Field type='text' name='fullname' />
                    </div>
                    <div className='profile__job info'>
                        <div className='job__category'>{language === 'english' ? 'Job' : 'Робота'}:
                            <div className='profile__job_looking info' style={{ display: 'flex' }}>
                                <span style={{ color: 'black', fontWeight: '600' }}>
                                    {language === 'english' ? 'Looking' : 'В пошуках роботи'}:
                                </span>
                                <Field type='checkbox' name='lookingForAJob' />
                            </div>
                            <div className='profile__job_description info'>
                                <span style={{ color: 'black', fontWeight: '600' }}>
                                    {language === 'english' ? 'My skills' : 'Мої скіли'}:
                                </span>
                                <Field type='text' name='LookingForAJobDescription' />
                            </div>
                            <div className='profile__aboutMe info'>
                                <span style={{ color: 'black', fontWeight: '600' }}>
                                    {language === 'english' ? 'About me' : 'Про мене'}:
                                </span>
                                <Field type='text' name='AboutMe' />
                            </div>
                        </div>
                    </div>
                    <div className='profile__contancts info'>
                        <span className='profile__contacts_title' style={{ color: 'black' }}>{language === 'english' ? 'Contacts' : 'Контакти'}: {
                            Object
                                // @ts-ignore
                                .keys(profile?.contacts)
                                .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу; по кожному елементу замапиться і відмальює компоненту Contact
                                    return (
                                        <div className='contacts' key={key}>
                                            <span style={{ color: 'black' }}>{key}:
                                                <Field type={key} name={`contacts.${key}`} />
                                            </span>
                                        </div>
                                    )
                                })}</span>
                    </div>
                    <Button type='primary' danger htmlType='submit' onClick={outFromEditMode} style={{ marginRight: 30 }}>
                        {language === 'english' ? 'Back' : 'Назад'}
                    </Button>
                    <Button type='primary' htmlType='submit' disabled={props.isSubmitting} >
                        {language === 'english' ? 'Save' : 'Зберегти'}
                    </Button>
                </Form>
            )}
        </Formik>
    )
})