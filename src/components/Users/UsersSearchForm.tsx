import { SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space } from 'antd'
import { Field, Form, Formik } from 'formik'
import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { getLanguage } from '../../redux/app-selectors'
import { FilterType } from '../../redux/users-reducer'

const usersSearchFormValidate = (values: any) => {
    const errors = {}
    return errors
}

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

    return (
        <div>
            <Formik
                initialValues={{ term: '', friend: 'null' }}
                validate={usersSearchFormValidate}
                // @ts-ignore
                onSubmit={submit}>
                {props => (
                    <Form onSubmit={props.handleSubmit}>
                        <Input onChange={props.handleChange} onBlur={props.handleBlur}
                            value={props.values.term} name='term' className='term__field' />
                        {props.errors.term && <div id='feedback'>{props.errors.term}</div>}
                        {language === 'english'
                        ? <Field name='friend' as='select'>
                            <option value='null'>All</option>
                            <option value='true'>Only following</option>
                            <option value='false'>Only unfollowing</option>
                        </Field>
                        : <Field name='friend' as='select'>
                        <option value='null'>Всі</option>
                        <option value='true'>Тільки відстежувані</option>
                        <option value='false'>Тільки невідстежувані</option>
                    </Field>    
                    }
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