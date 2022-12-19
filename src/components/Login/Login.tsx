import { Button, Space } from 'antd'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { login } from '../../redux/auth-reducer'
import { getCaptchaUrlSelector } from '../../redux/login-selectors'
import { getIsAuth } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { maxLengthCreator, minLengthCreator, required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'
import './Login.css'


const maxLength15 = maxLengthCreator(30)
const minLength4 = minLengthCreator(4)

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

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Navigate to='/profile' />
    }

    return (
        <div className='login'>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
})

type LoginFormOwnProps = {
    captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (
    { handleSubmit, error }) => {

    const captchaUrl = useSelector(getCaptchaUrlSelector)

    return (
        <form onSubmit={handleSubmit} action='#'>
            <div>
                <Field type={'email'} name={'email'} component={Element} elementType='input' placeholder='Email'
                    validate={[required, maxLength15, minLength4]} />
            </div>
            <div>
                <Field type={'password'} name={'password'} component={Element} elementType='input' placeholder='Password'
                    validate={[required, maxLength15, minLength4]} />
            </div>
            <div>
                <Field type={'checkbox'} name={'rememberMe'} component={Element} elementType='input' /> Remember me
            </div>

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl &&
                <Field name={'captcha'} component={Element} elementType='input'
                    placeholder='Symbols from captcha' validate={[required]} />
            }


            {error && <div className='form__error'>{error}</div>}
            <div>
                <Space wrap>
                    <Button type='primary' htmlType='submit'>Log In</Button>
                </Space>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
    form: 'login' // унікальне ім'я для форми (не має відношення до form в state) 
})(LoginForm)