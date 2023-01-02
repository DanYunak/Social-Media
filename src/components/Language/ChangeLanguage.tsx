import { Button } from 'antd'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { changeLanguage } from '../../redux/app-reducer'
import { getLanguage } from '../../redux/app-selectors'
import { useAppDispatch } from '../../redux/redux-store'

type PropsType = {
    path: string
}

export const ChangeLanguage: FC<PropsType> = memo((props) => {

    const language = useSelector(getLanguage)

    const dispatch = useAppDispatch()
    
    const navigate = useNavigate()

    return (
        <div>
            <Button type='default' disabled={language === 'english'} onClick={() => {
                dispatch(changeLanguage('english'))
                navigate(props.path)
            }} style={{ marginLeft: 15, marginRight: 10 }}>
                Eng
                <span style={{ marginLeft: 5 }}>🇬🇧</span>
            </Button>
            <Button type='default' disabled={language === 'ukrainian'} onClick={() => {
                dispatch(changeLanguage('ukrainian'))
                navigate(props.path)
            }}>
                Ukr
                <span style={{ marginLeft: 5 }}>🇺🇦</span>
            </Button>
        </div>
    )
})