import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'

export const PostAvatar = () => {
    return (
        <div className='post__avatar'>
            <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 30 }} />
        </div>
    )
}