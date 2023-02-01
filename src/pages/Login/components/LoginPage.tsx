import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../../../features/LoginForm/index'
import { getCaptchaUrlSelector } from '../../../features/LoginForm/model/login-selectors'
import { actions } from '../../../redux/actions/auth-actions'
import { useAppDispatch } from '../../../redux/redux-store'
import { getIsAuth } from '../../../widgets/Profile'
import './Login.css'

export type LoginFormValuesType = {
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
        dispatch(actions.login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    useEffect(() => {
        if (isAuth) {
            navigate('/profile')
        }
    }, [isAuth])

    return (
        <div className='login'>
            <h1>LOGIN</h1>
            <LoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
        </div>
    )
})