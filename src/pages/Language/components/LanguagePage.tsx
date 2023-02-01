import { FC, memo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { ChangeLanguage } from '../../../features/ChangeLanguage/index'
import { languageParse } from '../../../app/model/app-reducer'
import './LanguagePage.css'

export const LanguagePage: FC = memo(() => {

    const navigate = useNavigate()

    useEffect(() => {
        if (languageParse) {
            navigate('/profile')
        }
    }, [languageParse])


    return (
        <div className='language'>
            Choose your language:
            <ChangeLanguage path={'/login'} />
        </div>
    )
})