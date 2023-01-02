import { LikeOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FC, memo } from 'react';
import './Post.scss';

type PropsType = {
    message: string
    likes: number
}

const Post: FC<PropsType> = memo(({ message, likes }) => {
    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 30 }} />
            </div>
            <div className='post__content'>
                <div style={{ marginBottom: 10 }}>
                    {message}
                </div>
                <div>
                    {likes} <LikeOutlined />
                </div>
            </div>
        </div>
    )
})

export default Post