// import './ProfileDataForm.css'
import { Element } from '../../common/FormsControls/FormsControls'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { ProfileType } from '../../../redux/types/types'
import { FC, memo } from 'react'
import { Button } from 'antd'

type PropsType = {
    profile: ProfileType | null

    outFromEditMode: () => void
}

const ProfileDataForm: FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = memo(
    ({ profile, outFromEditMode, handleSubmit, error }) => {
        return (
            <form className='profile__form' onSubmit={handleSubmit} action='#'>
                <div className='profile__info'>
                    <div className='profile__fullname info'><span>Fullname</span>:
                        <Field type={'text'} name={'fullname'} component={Element} elementType='input' placeholder='Fullname' />
                    </div>
                    <div className='profile__job info'>
                        <div className='job__category'>Job:
                            <div className='profile__job_looking info'>
                                <span style={{ color: 'black', fontWeight: '600' }}>Looking for a job</span>
                                <Field type={'checkbox'} name={'LookingForAJob'} component={Element} elementType='input' />
                            </div>
                            <div className='profile__job_description info'>
                                <span style={{ color: 'black', fontWeight: '600' }}>My skills:</span>
                                <Field type={'text'} name={'LookingForAJobDescription'} component={Element} elementType='input' placeholder='Skills' />
                            </div>
                            <div className='profile__aboutMe info'>
                                <span style={{ color: 'black', fontWeight: '600' }}>About me:</span>
                                <Field type={'text'} name={'AboutMe'} component={Element} elementType='textarea' placeholder='About you' />
                            </div>
                        </div>
                    </div>
                    <div className='profile__contancts info'>
                        <span className='profile__contacts_title' style={{ color: 'black' }}>Contacts: {
                            Object
                                // @ts-ignore
                                .keys(profile.contacts)
                                .map(key => { //? Object.keys пробіжиться по всьому об'єкту який приходить з серверу і дасть кожному елементу по ключу; по кожному елементу замапиться і відмальює компоненту Contact
                                    return (
                                        <div className='contacts' key={key}>
                                            <span style={{ color: 'black' }}>{key}:
                                                <Field type={key} name={'contacts.' + key} component={Element} elementType='input' placeholder='link' />
                                            </span>
                                        </div>
                                    )
                                })}</span>
                    </div>
                </div>
                <Button type='primary' danger htmlType='submit' onClick={outFromEditMode} style={{marginRight: 30}}>Back</Button>
                <Button type='primary' htmlType='submit'>Save</Button>
                {error && <div className='form__error'>{error}</div>}
            </form>
        )
    })

const ProfileDataFormRedux = reduxForm<ProfileType, PropsType>({ form: 'edit_profile' })(ProfileDataForm)

export default ProfileDataFormRedux