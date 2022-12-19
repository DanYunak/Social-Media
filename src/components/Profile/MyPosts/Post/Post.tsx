import { UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { FC, memo } from 'react'
import './Post.scss';

type PropsType = {
    message: string
    likes: number
}

const Post: FC<PropsType> = memo(({message, likes}) => {
    return (
        <div className='post'>
            <div className='post__avatar'>
            <Avatar size={64} icon={<UserOutlined />} style={{marginRight: 30}} />
            </div>
            <div className='post__content'>
                {message}
                <div className='post__likes'>
                    <span>like</span> {likes}
                </div>
            </div>
        </div>
    )
})

export default Post