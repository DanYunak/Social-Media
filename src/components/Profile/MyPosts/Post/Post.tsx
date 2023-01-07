import { LikeOutlined, UserOutlined, LikeFilled } from '@ant-design/icons';
import { Avatar } from 'antd';
import { FC, memo, useState } from 'react';
import './Post.scss';

type PropsType = {
    message: string
    likes: number
}

const Post: FC<PropsType> = memo(({ message, likes }) => {

    const [likesNum, setLikesNum] = useState(1)
    const [isLike, setIsLike] = useState(false)

    const toggleLike = () => {
        setIsLike(!isLike)
    }

    return (
        <div className='post'>
            <div className='post__avatar'>
                <Avatar size={64} icon={<UserOutlined />} style={{ marginRight: 30 }} />
            </div>
            <div className='post__content'>
                <div style={{ marginBottom: 10 }}>
                    {message}
                </div>
                <div onClick={toggleLike}>
                    {!isLike && <div onClick={() => setLikesNum(likesNum + 1)} >
                        {likesNum} <LikeOutlined style={{ cursor: 'pointer' }} />
                    </div>}
                    {isLike && <div onClick={() => { setLikesNum(likesNum - 1) }}>
                        {likesNum} <LikeFilled style={{ cursor: 'pointer' }} />
                    </div>}
                    {/* {likes} <LikeOutlined /> */}
                </div>
            </div>
        </div>
    )
})

export default Post