import { Button, Checkbox, Input } from 'antd'
import { ErrorMessage, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import { ProfileType } from '../../../widgets/Profile/index'
import { getProfile } from '../../../widgets/Profile/model/profile-selectors'
import { contactsIcons } from '../lib/helpers/contactsIcons'
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

    const valigateSchema = Yup.object().shape({
        fullName: Yup.string()
            .min(1, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required'),
        lookingForAJobDescription: Yup.string()
            .min(3, 'Too Short!')
            .max(100, 'Too Long!'),
        aboutMe: Yup.string()
            .min(3, 'Too Short!')
            .max(100, 'Too Long!'),
    })

    return (
        // @ts-ignore
        <Formik initialValues={{ fullName: '', lookingForAJob: false, lookingForAJobDescription: '', aboutMe: '' }}
            validationSchema={valigateSchema} onSubmit={onSubmit} >
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <div className='profile__fullname info'>
                        <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='fullName'
                            placeholder={language === eng ? 'Fullname' : `Повне ім'я`} className='input__field' />
                        <ErrorMessage name='fullName' component='div' className='error__message_profile' />
                    </div>
                    <div className='profile__job info'>
                        <div className='job__category'>{language === eng ? 'Job' : 'Робота'}:
                            <div className='profile__job_looking info' style={{ display: 'flex' }}>
                                <span style={{ color: 'black', fontWeight: '600' }}>
                                    {language === eng ? 'Looking for a job' : 'В пошуках роботи'}:
                                </span>
                                <Checkbox onChange={formik.handleChange} name='lookingForAJob' style={{ marginLeft: 10 }} />
                            </div>
                            <div className='profile__job_description info'>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='lookingForAJobDescription'
                                    placeholder={language === eng ? 'Looking for a job description' : 'Опис шуканої роботи'} className='input__field' />
                                <ErrorMessage name='lookingForAJobDescription' component='div' className='error__message_profile' />
                            </div>
                            <div className='profile__aboutMe info'>
                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name='aboutMe'
                                    placeholder={language === eng ? 'About me' : 'Про мене'} className='input__field' />
                                <ErrorMessage name='aboutMe' component='div' className='error__message_profile' />
                            </div>
                        </div>
                    </div>
                    <div className='profile__contancts info'>
                        <span className='profile__contacts_title' style={{ color: 'black' }}>{language === eng ? 'Contacts' : 'Контакти'}: {
                            Object
                                // @ts-ignore
                                .keys(profile?.contacts)
                                .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу по кожному елементу замапиться і відмальює компоненту Contact
                                    return (
                                        <div className='edit__contacts' key={key}>
                                            <div className='contact'>
                                                <Input onChange={formik.handleChange} onBlur={formik.handleBlur} name={`contacts.${key}`}
                                                    className='input__contact' type={key} placeholder={key} style={{ marginLeft: 10, marginTop: 10, width: 150 }}
                                                    prefix={contactsIcons(key)}
                                                />
                                            </div>
                                        </div>
                                    )
                                })}</span>
                    </div>
                    <div className='btn__actions'>
                        <Button type='primary' danger htmlType='submit' onClick={outFromEditMode} style={{ marginRight: 40 }}>
                            {language === eng ? 'Back' : 'Назад'}
                        </Button>
                        <Button type='primary' htmlType='submit' disabled={formik.isSubmitting} >
                            {language === eng ? 'Save' : 'Зберегти'}
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    )
})