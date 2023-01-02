import { FC, memo, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { languageParse } from '../../redux/app-reducer'
import { ChangeLanguage } from './ChangeLanguage'
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