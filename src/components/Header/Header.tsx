import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Space } from 'antd'
import { FC, memo, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { getUserLogin, getUserSmallPhoto } from '../../redux/header-selectors'
import { getIsAuth } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import './Header.css'

export const HeaderApp: FC = memo(() => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getUserLogin)
    const smallPhoto = useSelector(getUserSmallPhoto)
    
    const location = useLocation()
    
    const dispatch = useAppDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return (
        <header className='header'>
            <div className='login__block'>
                <div className='user__img'>
                    // todo 
                    {/* {smallPhoto
                        ? <div>
                            <img src={smallPhoto} width='50' height='50' />
                        </div>
                        : <div className='user__avatar'>
                            <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                        </div>
                    } */}
                </div>
                {isAuth
                    ? <span>
                        <div className='profile__name' style={{ color: 'white' }}>{login}</div>
                        {login
                            ? <Space wrap>
                                <Button type='primary' onClick={logoutCallback} danger>
                                    Log Out
                                </Button>
                            </Space>
                            : null}
                    </span>
                    : <Link to={'/login'}>
                        <Space wrap>
                            <Button type='default' htmlType='submit' className='login__btn'>Log In</Button>
                        </Space>
                    </Link>}
            </div>
        </header >
    )
})