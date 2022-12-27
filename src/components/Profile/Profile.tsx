import ProfileInfo from './ProfileInfo/ProfileInfo';
import { FC, memo } from 'react';
import { ProfileType } from '../../redux/types/types';
import { MyPosts } from './MyPosts/MyPosts';

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

export default Profile;