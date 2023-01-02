import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../redux/app-selectors'
import { getPostsData } from '../../../redux/myPosts-selectors'
import { actions } from '../../../redux/profile-reducer'
import { useAppDispatch } from '../../../redux/redux-store'
// import './MyPosts.css'
import Post from './Post/Post'
import { PostReduxForm } from './PostForm'

export type AddPostValueType = {
    newPostBody: string
}

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
                <PostReduxForm onSubmit={onAddPost} />
            </div>
            <div className='posts'>
                {postsElements}
            </div>
        </div>
    )
})