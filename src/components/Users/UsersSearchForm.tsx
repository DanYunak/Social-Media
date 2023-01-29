import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, Select, Space } from 'antd'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getLanguage } from '../../redux/selectors/app-selectors'
import { FilterType } from '../../redux/reducers/users-reducer'
import './Users'

type PropsType = {
    onFilterChanged: (filter: FilterType) => void
}

type FormType = {
    term: string
    friend: 'true' | 'false' | 'null'
}

export const UsersSearchForm: FC<PropsType> = memo(({ onFilterChanged }) => {

    const language = useSelector(getLanguage)

    const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        const filter: FilterType = {
            term: values.term,
            friend: values.friend === 'null' ? null : values.friend === 'true' ? true : false
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    const valigateSchema = Yup.object().shape({
        term: Yup.string()
            .min(1, 'Too Short!')
            .max(20, 'Too Long!')
    })

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validationSchema={valigateSchema}
                onSubmit={submit}>
                {formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <Input onChange={formik.handleChange} onBlur={formik.handleBlur} size='large' prefix={<UserOutlined />}
                            value={formik.values.term} name='term' className='term__field' />
                        <ErrorMessage name='term' component='span' className='error__message_search' />
                        <Select defaultValue='null'
                            onChange={(value) => formik.setFieldValue('friend', value)} style={{ width: 175 }}>
                            <Select.Option value='null'>{language === 'english' ? 'All' : 'Всі'}</Select.Option>
                            <Select.Option value='true'>{language === 'english' ? 'Only following' : 'Тільки відстежувані'}</Select.Option>
                            <Select.Option value='false'>{language === 'english' ? 'Only unfollowing' : 'Тільки невідстежувані'}</Select.Option>
                        </Select>
                        <Space wrap>
                            <Button type='primary' htmlType='submit' icon={<SearchOutlined />}
                                style={{ marginLeft: 20 }} size='large'>
                                {language === 'english' ? 'Search' : 'Пошук'}
                            </Button>
                        </Space>
                    </Form>
                )}
            </Formik>
        </div>
    )
})