import profileReducer from '../widgets/Profile/model/profile-reducer'
import dialogsReducer from './reducers/dialogs-reducer'
import sidebarReducer from './reducers/sidebar-reducer'

let store = {
    _state: {
        profilePage: {
            postsData: [
                { id: 1, message: 'Hi bro', likes: 24 },
                { id: 2, message: 'Please visit my acc', likes: 0 },
                { id: 3, message: 'Are you OK?', likes: 5 },
            ],
            newPostText: '',
        },
        dialogsPage: {
            dialogsData: [
                { id: 1, name: 'Dan' },
                { id: 2, name: 'Anna' },
                { id: 3, name: 'Julia' },
                { id: 4, name: 'Dima' },
                { id: 5, name: 'Alex' }
            ],
            messagesData: [
                { id: 1, message: 'Hi!' },
                { id: 2, message: 'May i call you on the phone?' },
                { id: 3, message: 'What are you doing tonight?' }
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    _callSubscriber() { //* Все що приватне для store і не можна викликати з-зовні має _ перед назвою
        console.log('State was changed')
    },

    getState() { // Спеціальна функція, бо в коді не можна звертатитися до _state, бо це приватна частина коду
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer
    },

    //? dispatch потрібен щоб не перекидувати в інші файли багато коду зі state (образно одна кнопка, яка вибирає який об'єкт віддати)
    dispatch(action) { // { type: 'ADD-POST' }

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)

        this._callSubscriber(this._state)
    }
}





export default store

window.store = store
// store = OOP