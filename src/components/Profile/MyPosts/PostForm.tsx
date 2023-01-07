import { Button, Input, Space } from 'antd'
import React, { FC, memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../../redux/app-selectors'
import { maxLengthCreator, minLengthCreator, required } from '../../../utils/validators/validators'
import { Element } from '../../common/FormsControls/FormsControls'
import { AddPostValueType } from './MyPosts'
import { Field, Form, Formik, useFormik } from 'formik'

const maxLength100 = maxLengthCreator(100)
const minLength2 = minLengthCreator(2)


type PropsType = {
    onSubmit: (values: AddPostValueType) => void
}

export const PostForm: FC<PropsType> = memo((props) => {

    const language = useSelector(getLanguage)

    return (
        <Formik initialValues={{ newPostBody: '' }}
            validate={values => {
                const errors = {}
                return errors
            }} onSubmit={(values, { resetForm }) => {
                props.onSubmit(values)
                resetForm()
            }} >
            {props => (
                <Form onSubmit={props.handleSubmit}>
                    <div className='post__field'>
                        {language === 'english'
                            ? <Field type='textarea' name='newPostBody'
                                placeholder='Enter the message'
                                validate={[required, maxLength100, minLength2]}
                            />
                            : <Field type='textarea' name='newPostBody'
                                placeholder='Введіть повідомлення'
                                validate={[required, maxLength100, minLength2]}
                            />
                        }
                    </div>
                    <div>
                        <Space wrap>
                            <Button type='primary' htmlType='submit' style={{ marginTop: 30 }}>
                                {language === 'english' ? 'Add Post' : 'Додати пост'}
                            </Button>
                        </Space>
                    </div>
                </Form>
            )}
        </Formik>
    )
})