import { Button, Space } from 'antd'
import { FC, memo } from 'react'
import { Field, InjectedFormProps, reduxForm } from 'redux-form'
import { maxLengthCreator, required } from '../../utils/validators/validators'
import { Element } from '../common/FormsControls/FormsControls'
import { NewMessageFormValueType } from './Dialogs'
import './Dialogs.css'

const maxLength100 = maxLengthCreator(100)

type PropsType = {}

const AddMessageForm: FC<InjectedFormProps<NewMessageFormValueType, PropsType> & PropsType> = memo(({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} action='#'>
            <div className='messages__actions'>
                <div className='message__field'>
                    <Field type='text' name={'messageBody'} component={Element} elementType='textarea'
                        placeholder={'Enter your message'} validate={[required, maxLength100]} />
                </div>
                <div>
                    <Space wrap>
                        <Button type='primary' htmlType='submit' style={{ marginTop: 20 }}>
                            Send Message
                        </Button>
                    </Space>
                </div>
            </div>
        </form>
    )
})

export const MessageReduxForm = reduxForm<NewMessageFormValueType, PropsType>({ form: 'dialogsAddMessage' })(AddMessageForm)

export default AddMessageForm