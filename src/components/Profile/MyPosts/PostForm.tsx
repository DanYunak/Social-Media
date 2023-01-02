import { Button, Input, Space } from 'antd'
import { Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { getLanguage } from '../../../redux/app-selectors'
import { maxLengthCreator, minLengthCreator, required } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import { AddPostValueType } from './MyPosts'
// import './MyPosts.css'

const maxLength100 = maxLengthCreator(100)
const minLength2 = minLengthCreator(2)

type PropsType = {}

const { TextArea } = Input

const PostForm: FC<InjectedFormProps<AddPostValueType, PropsType> & PropsType> = memo(({ handleSubmit }) => {
    const language = useSelector(getLanguage)

    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className='post__field'>
                {language === 'english'
                    ? <Field type={'text'} name={'newPostBody'}
                        component={Element} elementType='textarea' placeholder='Enter the message'
                        validate={[required, maxLength100, minLength2]} />
                    : <Field type={'text'} name={'newPostBody'}
                        component={Element} elementType='textarea' placeholder='Введіть повідомлення'
                        validate={[required, maxLength100, minLength2]} />
                }
            </div>
            <div>
                <Space wrap>
                    <Button type='primary' htmlType='submit' style={{ marginTop: 30 }}>
                        {language === 'english' ? 'Add Post' : 'Додати пост'}
                    </Button>
                </Space>
            </div>
        </form>
    )
})

export const PostReduxForm = reduxForm<AddPostValueType, PropsType>({ form: 'profileAddNewPost' })(PostForm)

export default PostForm    