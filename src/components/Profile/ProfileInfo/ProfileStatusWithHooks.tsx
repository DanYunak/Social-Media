import { Divider } from 'antd'
import { useEffect, useState, FC, memo } from 'react'

type PropsType = {
    status: string

    updateStatus: (status: string) => void
}

const ProfileStatusWithHooks: FC<PropsType> = memo((props) => {

    //* В useState є масив, в якому перше значення (0) є значення, друге значення (1) - функція, яка це значення встановлює
    let [editMode, setEditMode] = useState(false)
    let [status, setStatus] = useState(props.status)

    useEffect(() => { //* Коли компонента відмалюється
        setStatus(props.status) // Синхронізую статус з локальним статусом
    }, [props.status]) //? В [] вказана залежність useEffect від props.status, якщо при відмальовуванні статус буде не такий як раніше, то запуститься effect (синхронізація стану)
    //? Якщо не поставити залежність в масиві, то effect буде виконуватися після кожного відмальовування

    const activaEditMode = () => {
        setEditMode(true)
    }

    const deactivateEditMode = () => {
        setEditMode(false)
        props.updateStatus(status)
    }

    const onStatusChange = (e: { currentTarget: HTMLInputElement }) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div className='profile__status_wrapper' >
            {!editMode &&
                <div className='profile__status info'>
                    <span onDoubleClick={activaEditMode}><b>Status:</b>
                        <span className='status'> {props.status || 'none'} </span>
                    </span>
                </div>
            }
            {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
                </div>
            }
        </div>
    )
})

export default ProfileStatusWithHooks