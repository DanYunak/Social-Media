import { Input } from 'antd'
import { ChangeEvent, FC, memo } from 'react'
import { useAppDispatch } from '../../../redux/redux-store'
import { actions } from '../../../widgets/Profile/model/profile-actions'
import './AvatarChange.css'
import { CloudUploadOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts';

type PropsType = {
    isOwner: boolean
}


export const AvatarChange: FC<PropsType> = memo(({ isOwner }) => {

    const dispatch = useAppDispatch()

    const language = useSelector(getLanguage)

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            dispatch(actions.savePhoto(e.target.files[0]))
        }
    }

    return (
        <div className='avatar__change' >
            {isOwner &&
                <div className='avatar__change'>
                    <label htmlFor='file__upload' className='custom__file_upload'>
                        <CloudUploadOutlined style={{ marginRight: 10 }} />{language === eng ? 'Change Avatar' : 'Змінити фото'}
                    </label>
                    <Input type={'file'} id='file__upload' onChange={onMainPhotoSelected} />
                </div>
            }
        </div>
    )
})