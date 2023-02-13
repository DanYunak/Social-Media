import { Button } from 'antd'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { actionsApp } from '../../../app/model/app-reducer'
import { useAppDispatch } from '../../../redux/redux-store'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng, ukr } from '../../../shared/constants/languageConsts'
import './ChangeLanguage.css'

type PropsType = {
    path: string
}

export const ChangeLanguage: FC<PropsType> = memo((props) => {

    const language = useSelector(getLanguage)

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    return (
        <div className='language__wrapper'>
            <div className='language__btns'>
                <Button type='default' disabled={language === eng} onClick={() => {
                    dispatch(actionsApp.changeLanguage(eng))
                    navigate(props.path)
                }} style={{ marginLeft: 15, marginRight: 10 }}>
                    Eng
                    <span style={{ marginLeft: 5 }}>🇬🇧</span>
                </Button>
                <Button type='default' className='ukr__btn' disabled={language === ukr} onClick={() => {
                    dispatch(actionsApp.changeLanguage(ukr))
                    navigate(props.path)
                }}>
                    Ukr
                    <span style={{ marginLeft: 5 }}>🇺🇦</span>
                </Button>
            </div>
        </div>
    )
})