import dialogsReducer, { actions, InitialStateType } from './dialogs-reducer'

let state: InitialStateType

beforeEach(() => {
    state = {
        dialogsData: [
            { id: 1, name: 'Dan' },
            { id: 2, name: 'Anna' },
            { id: 3, name: 'Julia' },
            { id: 4, name: 'Dima' },
            { id: 5, name: 'Alex' }
        ],
        messagesData: [
            { id: 1, message: 'Hi!' },
            { id: 2, message: 'OK' },
            { id: 3, message: 'What are you doing tonight?' }
        ]
    }
})

test('new message should be correct', () => {
    let newState = dialogsReducer(state, actions.sendMessage('message'))

    expect(newState.messagesData[3].message).toBe('message')
})
