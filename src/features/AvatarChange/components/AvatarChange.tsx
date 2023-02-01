import { Input } from 'antd'
import { ChangeEvent, FC, memo } from 'react'
import { useAppDispatch } from '../../../redux/redux-store'
import { actions } from '../../../widgets/Profile/model/profile-actions'

type PropsType = {
    isOwner: boolean
}


export const AvatarChange: FC<PropsType> = memo(({ isOwner }) => {

    const dispatch = useAppDispatch()

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(actions.savePhoto(e.target.files[0]))
        }
    }

    return (
        <div className='avatar__change'>
            {isOwner && <Input type={'file'} onChange={onMainPhotoSelected} style={{ width: 200 }} />}
        </div>
    )
})