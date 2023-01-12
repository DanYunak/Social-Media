import { Button, Checkbox, Space } from 'antd'
import { ErrorMessage, Field, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
import { login } from '../../redux/auth-reducer'
import { getCaptchaUrlSelector } from '../../redux/login-selectors'
import { getIsAuth } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { maxLengthCreator, minLengthCreator } from '../../utils/validators/validators'
import './Login.css'

type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}


export const LoginPage: FC = memo(() => {
    const dispatch = useAppDispatch()

    const captchaUrl = useSelector(getCaptchaUrlSelector)
    const isAuth = useSelector(getIsAuth)

    const navigate = useNavigate()

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        navigate('/profile')
    }

    return (
        <div className='login'>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
})

type PropsType = {
    onSubmit: (formData: LoginFormValuesType) => void
    captchaUrl: string | null
}

const LoginForm: FC<PropsType> = memo((props) => {

    const captchaUrl = useSelector(getCaptchaUrlSelector)

    const signupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
            .min(4, 'Too Short!')
            .max(20, 'Too Long!')
            .required('Required')
    })

    return (
        <Formik initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }} onSubmit={props.onSubmit} validationSchema={signupSchema}>
            {formik =>
                <form onSubmit={formik.handleSubmit} action='#'>
                    <div>
                        <Field type='email' name='email' placeholder='Email' />
                        <ErrorMessage name='email' component='div' className='error__message_login' />
                    </div>
                    <div>
                        <Field type='password' name={'password'} placeholder='Password' />
                        <ErrorMessage name='password' component='div' className='error__message_login' />
                    </div>
                    <div style={{ fontSize: 20, textAlign: 'center', marginTop: 20, marginBottom: 10 }}>
                        <Checkbox>Remember me</Checkbox>
                    </div>

                    {captchaUrl && <img src={captchaUrl} />}
                    {captchaUrl &&
                        <Field name='captcha' placeholder='Symbols from captcha' />
                    }
                    <div style={{ textAlign: 'center', marginTop: 10 }}>
                        <Space wrap>
                            <Button type='primary' htmlType='submit'>Log In</Button>
                        </Space>
                    </div>
                </form>
            }
        </Formik>
    )
})