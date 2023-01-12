import { Input } from 'antd'
import { FC, memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../redux/app-selectors'
import { updateStatus } from '../../../redux/profile-reducer'
import { getStatusSelector } from '../../../redux/profile-selectors'
import { useAppDispatch } from '../../../redux/redux-store'

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
        dispatch(updateStatus(userStatus))
    }

    const onStatusChange = (e: { currentTarget: HTMLInputElement }) => {
        setUserStatus(e.currentTarget.value)
    }

    return (
        <div className='profile__status_wrapper' >
            {!editMode &&
                <div className='profile__status info'>
                    {isOwner
                        ? <span onDoubleClick={activateEditMode}>
                            <>
                                <b>{language === 'english' ? 'Status' : 'Статус'}:</b>
                                <span className='status' style={{ marginLeft: 5 }}>
                                    {language === 'english' ? status || 'none' : status || 'відсутній'}
                                </span>
                            </>
                        </span>
                        : <span>
                            <>
                                <b>{language === 'english' ? 'Status' : 'Статус'}:</b>
                                <span className='status' style={{ marginLeft: 5 }}>
                                    {language === 'english' ? status || 'none' : status || 'відсутній'}
                                </span>
                            </>
                        </span>
                    }
                </div>
            }
            {editMode &&
                <div>
                    <Input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode}
                        value={userStatus} style={{ width: 250, marginTop: 15 }} />
                </div>
            }
        </div>
    )
})