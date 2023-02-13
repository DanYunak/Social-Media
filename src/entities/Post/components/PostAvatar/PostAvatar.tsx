import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export const PostAvatar = () => {
    return (
        <div className='post__avatar'>
            <Avatar size={window.innerWidth >= 500 ? 64 : 50} icon={<UserOutlined />} style={{ marginRight: 30 }} />
        </div>
    )
}