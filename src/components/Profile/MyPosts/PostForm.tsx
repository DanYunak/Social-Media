import { Button, Input, Space } from 'antd'
import { Formik } from 'formik'
import { FC, memo } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, minLengthCreator, required } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import { AddPostValueType } from './MyPosts'
// import './MyPosts.css'

const maxLength100 = maxLengthCreator(100)
const minLength2 = minLengthCreator(2)

type PropsType = {}

const { TextArea } = Input

const PostForm: FC<InjectedFormProps<AddPostValueType, PropsType> & PropsType> = memo(({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className='post__field'>
                <Field type={'text'} name={'newPostBody'}
                    component={Element} elementType='textarea' placeholder='Enter the message'
                    validate={[required, maxLength100, minLength2]} />
            </div>
            <div>
                <Space wrap>
                    <Button type='primary' htmlType='submit' style={{ marginTop: 30 }}>
                        Add Post
                    </Button>
                </Space>
            </div>
        </form>
    )
})

export const PostReduxForm = reduxForm<AddPostValueType, PropsType>({ form: 'profileAddNewPost' })(PostForm)

export default PostForm    