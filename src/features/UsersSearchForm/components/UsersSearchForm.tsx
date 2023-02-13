import { SearchOutlined, UserOutlined } from '@ant-design/icons'
import { Button, Input, Select, Space } from 'antd'
import { ErrorMessage, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import * as Yup from 'yup'
import { getLanguage } from '../../../app/model/app-selectors'
import { eng } from '../../../shared/constants/languageConsts'
import { FilterType } from '../../../widgets/Users/model/users-reducer'
import './UsersSearchForm.css'

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
                        <div className='form__actions'>
                            <Input onChange={formik.handleChange} onBlur={formik.handleBlur} size={window.innerWidth >= 698 ? 'large' : 'small'} prefix={<UserOutlined />}
                                value={formik.values.term} name='term' className='term__field' />
                            <ErrorMessage name='term' component='span' className='error__message_search' />
                            <Select defaultValue='null'
                                onChange={(value) => formik.setFieldValue('friend', value)} className='select__dropdown'>
                                <Select.Option value='null'>{language === eng ? 'All' : 'Всі'}</Select.Option>
                                <Select.Option value='true'>{language === eng ? 'Only following' : 'Тільки відстежувані'}</Select.Option>
                                <Select.Option value='false'>{language === eng ? 'Only unfollowing' : 'Тільки невідстежувані'}</Select.Option>
                            </Select>
                            <Space wrap>
                                <Button type='primary' htmlType='submit' className='search__btn' icon={<SearchOutlined />}
                                    size={window.innerWidth >= 698 ? 'large' : 'middle'}>
                                    {language === eng ? 'Search' : 'Пошук'}
                                </Button>
                            </Space>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
})