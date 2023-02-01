import { Button, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { ErrorMessage, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'

import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import { AddPostValueType } from '../../../widgets/Profile/index'

type PropsType = {
    onSubmit: (values: AddPostValueType) => void
}

export const PostForm: FC<PropsType> = memo((props) => {

    const language = useSelector(getLanguage)

    const valigatePostSchema = Yup.object().shape({
        newPostBody: Yup.string()
            .min(2, 'Too Short!')
            .max(200, 'Too Long!')
    })

    return (
        <Formik initialValues={{ newPostBody: '' }} onSubmit={(values, { resetForm }) => {
            props.onSubmit(values)
            resetForm()
        }} validationSchema={valigatePostSchema}>
            {formik => (
                <Form onSubmit={formik.handleSubmit}>
                    <div className='post__field'>
                        <TextArea rows={2} value={formik.values.newPostBody} onChange={formik.handleChange} name='newPostBody'
                            placeholder={language === eng ? 'Enter the message' : 'Введіть повідомлення'} style={{ width: 250 }} />
                        <ErrorMessage name='newPostBody' component='div' className='error__message' />
                    </div>
                    <div>
                        <Space wrap>
                            <Button type='primary' htmlType='submit' style={{ marginTop: 30 }}>
                                {language === eng ? 'Add Post' : 'Додати пост'}
                            </Button>
                        </Space>
                    </div>
                </Form>
            )}
        </Formik>
    )
})