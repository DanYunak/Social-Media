import { FC, memo } from 'react'
import { useSelector } from 'react-redux'
import { actions } from '../../redux/dialogs-reducer'
import { getDialogsPage } from '../../redux/dialogs-selectors'
import { useAppDispatch } from '../../redux/redux-store'
import { MessageReduxForm } from './AddMessageForm'
import './DialogItem/DialogItem'
import DialogItem from './DialogItem/DialogItem'
import './Dialogs.css'
import Message from './Message/Message'


<div>
    {/* @ts-ignore */}
    <DialogItem />
    {/* @ts-ignore */}
    <Message />
</div>

export type NewMessageFormValueType = {
    messageBody: string
}

export const Dialogs: FC = memo(() => {

    const dialogsPage = useSelector(getDialogsPage)

    const dispatch = useAppDispatch()

    //* Навіть якщо буде 100 об'єктів сидіти в dialogsData, то ці дві строчки створють масив елементів зі 100 об'єктів
    let dialogsElements = dialogsPage.dialogsData.map(d => <DialogItem name={d.name} id={d.id} key={d.id} />) //* Стрілкова ф-ція буде викликатися стільки разів, скільки елементів у початкового масиву і кожен раз ф-ція map засунить в цю ф-цію конкретний елемент з початкового масиву
    //? d - dialog

    let messagesElements = dialogsPage.messagesData.map(m => <Message message={m.message} key={m.id} />)
    //? m - message

    const addNewMessage = (values: NewMessageFormValueType) => {
        dispatch(actions.sendMessage(values.messageBody))
    }

    return (
        <div className='dialogs'>
            <div className='dialogs__items'>
                {dialogsElements}
            </div>
            <div className='messages'>
                <div>{messagesElements}</div>
                <MessageReduxForm onSubmit={addNewMessage} />
            </div>
        </div>
    )
})