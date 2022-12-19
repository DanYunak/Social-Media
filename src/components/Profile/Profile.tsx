// import './Profile.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import { FC, memo } from 'react';
import { ProfileType } from '../../redux/types/types';
import { MyPosts } from './MyPosts/MyPosts';

type PropsType = {
    profile: ProfileType | null
    status: string
    isOwner: boolean

    updateStatus: (status: string) => void
    savePhoto: (file: File) => void
    saveProfile: (profile: ProfileType) => any
}

const Profile: FC<PropsType> = memo((props) => {
    return (
        <div className='profile' >
            <ProfileInfo profile={props.profile} status={props.status} updateStatus={props.updateStatus}
                isOwner={props.isOwner} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
            <MyPosts />
        </div>
    )
})

export default Profile;