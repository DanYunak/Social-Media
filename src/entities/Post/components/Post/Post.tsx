import { LikeFilled, LikeOutlined } from '@ant-design/icons'
import { FC, memo, useState } from 'react'
import { PostAvatar } from '../PostAvatar/PostAvatar'
import './Post.scss'

type PropsType = {
    message: string
    likes: number
}

export const Post: FC<PropsType> = memo(({ message, likes }) => {

    const [likesNum, setLikesNum] = useState(1)
    const [isLike, setIsLike] = useState(false)

    const toggleLike = () => {
        setIsLike(!isLike)
    }

    return (
        <div className='post'>
            <PostAvatar />
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
                </div>
            </div>
        </div>
    )
})