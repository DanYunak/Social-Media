import './Navbar.css'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return(
        <nav className='menu'>
            <div className='menu__body'>
                <ul className='menu__list'>
                    <li><NavLink to='/profile' className='menu__link'>Profile</NavLink></li>
                    <li><NavLink to='/dialogs' className='menu__link'>Messages</NavLink></li>
                    <li><NavLink to='/news' className='menu__link'>News</NavLink></li>
                    <li><NavLink to='/music' className='menu__link'>Music</NavLink></li>
                    <li><NavLink to='/settings' className='menu__link'>Settings</NavLink></li>
                    <li><NavLink to='users' className='menu__link menu__link_users' id='users'>Users</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}