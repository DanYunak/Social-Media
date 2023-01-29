import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Space } from 'antd'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { authAPI } from '../../api/auth-api'
import { actions } from '../../redux/reducers/auth-reducer'
import { useAppDispatch } from '../../redux/redux-store'
import { getLanguage } from '../../redux/selectors/app-selectors'
import { getUserLogin } from '../../redux/selectors/auth-selectors'
import { getAuthorizedId, getIsAuth, getProfile } from '../../redux/selectors/profile-selectors'
import './Header.css'

type PropsType = {
    collapsedMenu: boolean
}

export const HeaderApp: FC<PropsType> = memo((props) => {
    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getUserLogin)
    const authorizedId = useSelector(getAuthorizedId)
    const language = useSelector(getLanguage)
    const profile = useSelector(getProfile)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const [smallUserPhoto, setSmallUserPhoto] = useState('')

    const logoutCallback = () => {
        dispatch(actions.logout(navigate))

        setSmallUserPhoto('')
    }

    const fetchSmallPhoto = async () => {
        const smallPhoto = await authAPI.getSmallPhoto(authorizedId)
        if (smallPhoto.small !== smallUserPhoto) {
            setSmallUserPhoto(smallPhoto.small)
        }
    }

    useEffect(() => {
        fetchSmallPhoto()
    }, [profile])

    return (
        <header className={!props.collapsedMenu ? 'header' : 'header__collapsed'}>
            <div className='login__block'>
                <div className='user__img'>
                    {smallUserPhoto !== ''
                        ? <div>
                            <img src={smallUserPhoto} width='50' height='50' />
                        </div>
                        : <div className='user__avatar'>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </div>}
                </div>
                {isAuth
                    ? <span>
                        <div className='profile__name' style={{ color: 'white' }}>{login}</div>
                        {login
                            ? <Space wrap>
                                <Button type='primary' onClick={logoutCallback} danger>
                                    {language === 'english' ? 'Log Out' : 'Вийти'}
                                </Button>
                            </Space>
                            : null}
                    </span>
                    : <Link to={'/login'}>
                        <Space wrap>
                            <Button type='default' htmlType='submit' className='login__btn'>
                                {language === 'english' ? 'Log In' : 'Увійти'}
                            </Button>
                        </Space>
                    </Link>}
            </div>
        </header >
    )
})