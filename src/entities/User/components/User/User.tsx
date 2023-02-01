import { Button, Space } from 'antd'
import { FC } from 'react'
import { useSelector } from 'react-redux'
import { actions } from '../../../../widgets/Users/model/users-actions'
import { useAppDispatch } from '../../../../redux/redux-store'
import { getLanguage } from '../../../../app/model/app-selectors'
import { getFollowingInProgress } from '../../../../widgets/Users/model/users-selectors'
import { eng } from '../../../../shared/constants/languageConsts'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { UserInfo } from '../UserInfo/UserInfo'
import { UserType } from '../../model/types'
import { getIsAuth } from '../../../../widgets/Profile/model/profile-selectors'


type PropsType = {
    user: UserType
}

export const User: FC<PropsType> = ({ user }) => {

    const language = useSelector(getLanguage)
    const followingInProgress = useSelector(getFollowingInProgress)
    const isAuth = useSelector(getIsAuth)

    const dispatch = useAppDispatch()

    return (
        <div className='user'>
            <span>
                <UserAvatar user={user} />
                <UserInfo user={user} />
                {isAuth &&
                    <div className='user__btns'>
                        {user.followed
                            ? <Space wrap>
                                <Button type='primary' danger
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(actions.unfollow(user.id)) }}
                                    style={{ marginTop: 20, fontWeight: 700 }} size='large'>
                                    {language === eng ? 'Unfollow' : 'Відписатися'}
                                </Button>
                            </Space>

                            : <Space wrap>
                                <Button type='primary' size='large'
                                    disabled={followingInProgress.some(id => id === user.id)}
                                    onClick={() => { dispatch(actions.follow(user.id)) }}
                                    style={{ marginTop: 20, fontWeight: 700 }}>
                                    {language === eng ? 'Follow' : 'Підписатися'}
                                </Button>
                            </Space>}
                    </div>
                }
            </span>
        </div>
    )
}