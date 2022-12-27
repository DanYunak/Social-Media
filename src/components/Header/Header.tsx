import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Space } from 'antd'
import axios from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../../redux/auth-reducer'
import { getUserLogin } from '../../redux/auth-selectors'
import { getAuthorizedId, getIsAuth } from '../../redux/profile-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import './Header.css'

type GetPhotosResponseType = {
    photos: {
        small: string
        large: string
    }
}

export const HeaderApp: FC = memo(() => {

    const isAuth = useSelector(getIsAuth)
    const login = useSelector(getUserLogin)
    const authorizedId = useSelector(getAuthorizedId)

    const dispatch = useAppDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    const [smallUserPhoto, setSmallUserPhoto] = useState<string>('')

    useEffect(() => {
        axios.get<GetPhotosResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/${authorizedId}`)
            .then(res => {
                setSmallUserPhoto(res.data.photos.small)
            })
    }, [])

    return (
        <header className='header'>
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