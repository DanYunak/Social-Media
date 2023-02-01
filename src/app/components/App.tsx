import {
  CustomerServiceOutlined,
  HomeOutlined, NotificationOutlined, SettingOutlined, TeamOutlined, WechatOutlined
} from '@ant-design/icons'
import { Layout, Menu, MenuProps, theme } from 'antd'
import React, { FC, memo, Suspense, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import {
  BrowserRouter, Link, Navigate, Route, Routes, useNavigate
} from 'react-router-dom'
import './styles/App.css'
import { ChatPage } from '../../pages/Chat/index'
import { LanguagePage } from '../../pages/Language/index'
import { LoginPage } from '../../pages/Login/index'
import { MusicPage } from '../../pages/Music/index'
import { NewsPage } from '../../pages/News/index'
import { ProfilePage } from '../../pages/Profile/index'
import { SettingsPage } from '../../pages/Settings/index'
import { UsersPage } from '../../pages/Users/index'
import { actionsApp, languageParse } from '../model/app-reducer'
import store, { useAppDispatch } from '../../redux/redux-store'
import { getInitialized, getLanguage } from '../model/app-selectors'
import { Preloader } from '../../shared/components/Preloader/Preloader'
import { eng, ukr } from '../../shared/constants/languageConsts'
import { HeaderApp } from '../../widgets/Header/index'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}


export const App: FC = memo(() => {

  const dispatch = useAppDispatch()

  const initialized = useSelector(getInitialized)
  const language = useSelector(getLanguage)

  const navigate = useNavigate()

  useEffect(() => {
    if (!languageParse) {
      navigate('/language')
    }
  }, [languageParse])

  const itemsEng: MenuItem[] =
    [
      getItem('Profile', '1', <Link to='/profile'><HomeOutlined /></Link>),
      getItem('Chat', '2', <Link to='/chat'><WechatOutlined /></Link>),
      getItem('Users', '3', <Link to='/users'><TeamOutlined /></Link>),
      getItem('News', '4', <Link to='/news'><NotificationOutlined /></Link>),
      getItem('Music', '5', <Link to='/music'><CustomerServiceOutlined /></Link>),
      getItem('Settings', '6', <Link to='/settings'><SettingOutlined /></Link>)
    ]

  const itemsUkr: MenuItem[] =
    [
      getItem('Профіль', '1', <Link to='/profile'><HomeOutlined /></Link>),
      getItem('Чат', '2', <Link to='/chat'><WechatOutlined /></Link>),
      getItem('Користувачі', '3', <Link to='/users'><TeamOutlined /></Link>),
      getItem('Новини', '4', <Link to='/news'><NotificationOutlined /></Link>),
      getItem('Музика', '5', <Link to='/music'><CustomerServiceOutlined /></Link>),
      getItem('Налаштування', '6', <Link to='/settings'><SettingOutlined /></Link>)
    ]

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('An error has occured')
  }

  useEffect(() => {
    dispatch(actionsApp.initializeApp())
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors)

    return () => { // Component will unmount
      window.removeEventListener('unhandledrejection', catchAllUnhandledErrors)
    }
  }, [])

  if (!initialized) {
    return <Preloader />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)' }} />
        {language === eng && <Menu theme='dark' mode='inline' items={itemsEng} />}
        {language === ukr && <Menu theme='dark' mode='inline' items={itemsUkr} />}
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ height: 85 }}>
          <HeaderApp collapsedMenu={collapsed} />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/yun' element={<Navigate to='/profile' />} />
                <Route path='/profile/:userIdde' element={<ProfilePage />} />
                <Route path='/profile/' element={<ProfilePage />} />
                <Route path='/news' element={<NewsPage />} />
                <Route path='/music' element={<MusicPage />} />
                <Route path='/settings' element={<SettingsPage />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/chat' element={<ChatPage />} />
                <Route path='/language' element={<LanguagePage />} />
              </Routes>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Yun ©2022 Created by Dan Yunak</Footer>
      </Layout>
    </Layout>
  )
})