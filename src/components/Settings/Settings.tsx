import { useSelector } from 'react-redux'
import { getLanguage } from '../../redux/app-selectors'
import { ChangeLanguage } from '../Language/ChangeLanguage'
import './Settings.css'


const Settings = () => {

    const language = useSelector(getLanguage)

    return (
        <div className='settings'>
            <div className='language__change'>
                {language === 'english' ? 'Language' : 'Мова'}:
                <ChangeLanguage path={'/profile'} />
            </div>
        </div>
    )
}

export default Settings