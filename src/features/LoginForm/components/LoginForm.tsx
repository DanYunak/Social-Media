import { Button, Checkbox, Input, Space } from 'antd'
import { ErrorMessage, Field, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { LoginFormValuesType } from '../../../pages/Login/index'
import { getCaptchaUrlSelector } from '../model/login-selectors'
import { MailOutlined, LockOutlined } from '@ant-design/icons'
import './LoginForm.css'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts';

type PropsType = {
    onSubmit: (formData: LoginFormValuesType) => void
    captchaUrl: string | null
}

export const LoginForm: FC<PropsType> = memo((props) => {

    const captchaUrl = useSelector(getCaptchaUrlSelector)
    const language = useSelector(getLanguage)

    const signupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(4, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
    })

    return (
        <Formik initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            onSubmit={props.onSubmit} validationSchema={signupSchema}>
            {formik =>
                <form onSubmit={formik.handleSubmit} action='#'>
                    <div>
                        <Input type='email' name='email' placeholder={language === eng ? 'Email' : 'Електронна пошта'}
                            onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.email} prefix={<MailOutlined />} style={{ marginTop: 20, marginBottom: 20 }} />
                        <ErrorMessage name='email' component='div' className='error__message_login' />
                    </div>
                    <div>
                        <Input type='password' name='password' placeholder={language === eng ? 'Password' : 'Пароль'} onChange={formik.handleChange} onBlur={formik.handleBlur}
                            value={formik.values.password} prefix={<LockOutlined />} />
                        <ErrorMessage name='password' component='div' className='error__message_login' />
                    </div>
                    <div style={{ fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>
                        <Checkbox>Remember me</Checkbox>
                    </div>

                    <div className='captcha'>
                        {captchaUrl && <img src={captchaUrl} />}
                        {captchaUrl &&
                            <Input type='text' name='captcha' placeholder={language === eng ? 'Enter symbols from captcha' : 'Введіть сивмоли із перевірки'}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.captcha} />
                        }
                    </div>
                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <Space wrap>
                            <Button type='primary' htmlType='submit'>{language === eng ? 'Log In' : 'Увійти'}</Button>
                        </Space>
                    </div>
                </form>
            }
        </Formik>
    )
})