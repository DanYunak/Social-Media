import { Button, Space } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { actions } from '../../redux/reducers/users-reducer'
import { useAppDispatch } from '../../redux/redux-store'
import { getLanguage } from '../../redux/selectors/app-selectors'
import { getIsAuth } from '../../redux/selectors/profile-selectors'
import { getFollowingInProgress } from '../../redux/selectors/users-selectors'
import { UserType } from '../../redux/types/types'
const userImg = require('../../assets/images/avatar.png')

type PropsType = {
    user: UserType
}

const User: FC<PropsType> = ({ user }) => {

    const language = useSelector(getLanguage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useAppDispatch()

    return (
        <div className='user'>
            <span>
                <div className='user__avatar'>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null ? user.photos.small : userImg} width='80' height='80' alt='' />
                    </NavLink>
                </div>
                <div className='user__info'>
                    <div className='user__name'>
                        <NavLink to={'/profile/' + user.id}>{user.name}</NavLink>
                    </div>
                    <div className='user__status'>{user.status}</div>
                </div>
                {isAuth &&
                    <div className='user__btns'>
                        {user.followed
                            ? <Space wrap>
                                <Button type='primary' danger
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(actions.unfollow(user.id)) }}
                                    style={{ marginTop: 20, fontWeight: 700 }} size='large'>
                                    {language === 'english' ? 'Unfollow' : 'Відписатися'}
                                </Button>
                            </Space>

                            : <Space wrap>
                                <Button type='primary' size='large'
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(actions.follow(user.id)) }}
                                    style={{ marginTop: 20, fontWeight: 700 }}>
                                    {language === 'english' ? 'Follow' : 'Підписатися'}
                                </Button>
                            </Space>}
                    </div>
                }
            </span>
        </div>
    )
}

export default User