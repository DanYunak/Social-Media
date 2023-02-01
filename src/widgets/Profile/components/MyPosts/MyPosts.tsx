import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Post } from '../../../../entities/Post/index'
import { PostForm } from '../../../../features/PostForm/index'
import { getPostsData } from '../../model/profile-selectors'
import { getLanguage } from '../../../../app/model/app-selectors'
import { useAppDispatch } from '../../../../redux/redux-store'
import { actions } from '../../model/profile-actions'
import { AddPostValueType } from '../../model/types'


export const MyPosts: FC = memo(() => {

    const postsData = useSelector(getPostsData)
    const language = useSelector(getLanguage)

    const dispatch = useAppDispatch()

    let postsElements =
        [...postsData] //? роблю копію постів, щоб застосувати імютабельність (зміну масиву, але тільки його копії)
            .reverse() //? відображення постів навпаки
            .map(p => <Post message={p.message} likes={p.likes} key={p.id} />) //? p - post

    const onAddPost = (values: AddPostValueType) => {
        dispatch(actions.addPost(values.newPostBody))
    }

    return (
        <div className='posts'>
            <h3>
                {language === 'english' ? 'My posts' : 'Мої пости'}
            </h3>
            <div className='post__actions'>
                <PostForm onSubmit={onAddPost} />
            </div>
            <div className='posts'>
                {postsElements}
            </div>
        </div>
    )
})