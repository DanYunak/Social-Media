import { useSelector } from 'react-redux'
import { ChangeLanguage } from '../../../features/ChangeLanguage/index'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import './Settings.css'

export const Settings = () => {
    const language = useSelector(getLanguage)

    return (
        <div className='settings'>
            <div className='language__change'>
                {language === eng ? 'Language' : 'Мова'}:
                <ChangeLanguage path={'/profile'} />
            </div>
        </div>
    )
}