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

    const activaEditMode = () => {
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
                        ? <span onDoubleClick={activaEditMode}>
                            {language === 'english' &&
                                <>
                                    <b>Status:</b>
                                    <span className='status'> {status || 'none'} </span>
                                </>
                            }
                            {language === 'ukrainian' &&
                                <>
                                    <b>Статус:</b>
                                    <span className='status'> {status || 'відсутній'} </span>
                                </>
                            }
                        </span>
                        : <span>
                            {language === 'english' &&
                                <>
                                    <b>Status:</b>
                                    <span className='status'> {status || 'none'} </span>
                                </>
                            }
                            {language === 'ukrainian' &&
                                <>
                                    <b>Статус:</b>
                                    <span className='status'> {status || 'відсутній'} </span>
                                </>
                            }
                        </span>
                    }
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={userStatus} />
                </div>
            }
        </div>
    )
})