import { Input } from 'antd'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { actions } from '../../../model/profile-actions'
import { useAppDispatch } from '../../../../../redux/redux-store'
import { getLanguage } from '../../../../../app/model/app-selectors'
import { getStatusSelector } from '../../../model/profile-selectors'
import { eng } from '../../../../../shared/constants/languageConsts'
import './ProfileStatus.css'

type PropsType = {
    isOwner: boolean
}

export const ProfileStatus: FC<PropsType> = memo(({ isOwner }) => {
    const [editMode, setEditMode] = useState(false)

    const status = useSelector(getStatusSelector)
    const language = useSelector(getLanguage)

    const [userStatus, setUserStatus] = useState(status)

    const dispatch = useAppDispatch()

    useEffect(() => {
        setUserStatus(status)
    }, [status])

    const activateEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        dispatch(actions.updateStatus(userStatus))
    }

    const onStatusChange = (e: { currentTarget: HTMLInputElement }) => {
        setUserStatus(e.currentTarget.value)
    }

    return (
        <div className='profile__status_wrapper' >
            {!editMode &&
                <div className='profile__status info'>
                    {isOwner
                        ? <span style={{ display: 'flex' }} onDoubleClick={activateEditMode}>
                            <>
                                <b>{language === eng ? 'Status' : 'Статус'}:</b>
                                <div className='status'>
                                    {language === eng ? status || 'none' : status || 'відсутній'}
                                </div>
                            </>
                        </span>
                        : <span>
                            <>
                                <b>{language === eng ? 'Status' : 'Статус'}:</b>
                                <span className='status'>
                                    {language === eng ? status || 'none' : status || 'відсутній'}
                                </span>
                            </>
                        </span>
                    }
                </div>
            }
            {editMode &&
                <div>
                    <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                        value={userStatus} className='input__status' />
                </div>
            }
        </div>
    )
})