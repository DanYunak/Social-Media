import { Button } from 'antd'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { getLanguage } from '../../../redux/app-selectors'
import { ProfileType } from '../../../redux/types/types'
import { Element } from '../../common/FormsControls/FormsControls'
import './ProfileDataForm.css'

type PropsType = {
    profile: ProfileType | null

    outFromEditMode: () => void
}

export type ContactsTypeKey = {
    github: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
}

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = memo(({ profile, outFromEditMode, handleSubmit, error }) => {

    const language = useSelector(getLanguage)

    return (
        <form className='profile__form' onSubmit={handleSubmit} action='#'>
            <div className='profile__info'>
                <div className='profile__fullname info'><span>{language === 'english' ? 'Fullname' : `Повне ім'я`}</span>:
                    <Field type={'text'} name={'fullname'} component={Element} elementType='input' />
                </div>
                <div className='profile__job info'>
                    <div className='job__category'>{language === 'english' ? 'Job' : 'Робота'}:
                        <div className='profile__job_looking info' style={{ display: 'flex' }}>
                            <span style={{ color: 'black', fontWeight: '600' }}>{language === 'english' ? 'Looking' : 'В пошуках роботи'}:</span>
                            <Field type={'checkbox'} name={'LookingForAJob'} component={Element} elementType='input' />
                        </div>
                        <div className='profile__job_description info'>
                            <span style={{ color: 'black', fontWeight: '600' }}>{language === 'english' ? 'My skills' : 'Мої скіли'}:</span>
                            <Field type={'text'} name={'LookingForAJobDescription'} component={Element} elementType='input' />
                        </div>
                        <div className='profile__aboutMe info'>
                            <span style={{ color: 'black', fontWeight: '600' }}>{language === 'english' ? 'About me' : 'Про мене'}:</span>
                            <Field type={'text'} name={'AboutMe'} component={Element} elementType='textarea' />
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
                                            <Field type={key} name={`contacts.${key}`} component={Element} elementType='input' />
                                        </span>
                                    </div>
                                )
                            })}</span>
                </div>
            </div>
            <Button type='primary' danger htmlType='submit' onClick={outFromEditMode} style={{ marginRight: 30 }}>
                {language === 'english' ? 'Back' : 'Назад'}
            </Button>
            <Button type='primary' htmlType='submit'>{language === 'english' ? 'Save' : 'Зберегти'}</Button>
            {error && <div className='form__error'>{error}</div>}
        </form>
    )
})

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({ form: 'edit_profile' })(ProfileDataForm)

export default ProfileDataFormRedux