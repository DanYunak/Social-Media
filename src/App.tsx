import {
  CustomerServiceOutlined,
  HomeOutlined, MessageOutlined, NotificationOutlined, SettingOutlined, TeamOutlined, WechatOutlined
} from '@ant-design/icons'
import { Layout, Menu, MenuProps, theme } from 'antd'
import React, { FC, memo, Suspense, useEffect, useState } from 'react'
import { Provider, useSelector } from 'react-redux'
import {
  BrowserRouter, Link, Navigate, Route, Routes
} from 'react-router-dom'
import Preloader from './components/common/Preloader/Preloader'
import { Dialogs } from './components/Dialogs/Dialogs'
import { HeaderApp } from './components/Header/Header'
import { LoginPage } from './components/Login/Login'
import Music from './components/Music/Music'
import News from './components/News/News'
import { ProfilePage } from './components/Profile/ProfilePage'
import Settings from './components/Settings/Settings'
import { UsersPage } from './components/Users/UsersPage'
import { ChatPage } from './pages/Chat/ChatPage'
import { initializeApp } from './redux/app-reducer'
import { getInitialized } from './redux/app-selectors'
import store, { useAppDispatch } from './redux/redux-store'

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


const items: MenuItem[] = [
  getItem('Profile', '1', <Link to='/profile'><HomeOutlined /></Link>,),
  getItem('Messages', '2', <Link to='/dialogs'><MessageOutlined /></Link>),
  getItem('Users', '3', <Link to='/users'><TeamOutlined /></Link>),
  getItem('Chat', '4', <Link to='/chat'><WechatOutlined /></Link>),
  getItem('News', '5', <Link to='/news'><NotificationOutlined /></Link>),
  getItem('Music', '6', <Link to='/music'><CustomerServiceOutlined /></Link>),
  getItem('Settings', '7', <Link to='/settings'><SettingOutlined /></Link>)
];

const App: FC = memo(() => {

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const initialized = useSelector(getInitialized)
  const dispatch = useAppDispatch()

  const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    alert('An error has occured')
  }

  useEffect(() => {
    dispatch(initializeApp())
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
        <Menu theme='dark' mode='inline' items={items} />
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ height: 85 }}>
          <HeaderApp />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
            <Suspense fallback={<Preloader />}>
              <Routes>
                <Route path='/' element={<Navigate to='/profile' />} />
                <Route path='/profile/:userIdde' element={<ProfilePage />} />
                <Route path='/profile/' element={<ProfilePage />} />
                <Route path='/dialogs/*' element={<Dialogs />} />
                <Route path='/news' element={<News />} />
                <Route path='/music' element={<Music />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/users' element={<UsersPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/chat' element={<ChatPage />} />
              </Routes>
            </Suspense>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Yun ©2022 Created by Dan Yunak</Footer>
      </Layout>
    </Layout>
  )
})

const MainApp: FC = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  )
}

export default MainApp