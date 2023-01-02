import { FC, memo } from 'react'
import { MyPosts } from './MyPosts/MyPosts'
import { ProfileInfo } from './ProfileInfo/ProfileInfo'

type PropsType = {
    isOwner: boolean
}

const Profile: FC<PropsType> = memo((props) => {
    return (
        <div className='profile' >
            <ProfileInfo isOwner={props.isOwner} />
            <MyPosts />
        </div>
    )
})

export default Profile