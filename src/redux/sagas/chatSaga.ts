import { getMessages, getStatus } from './../selectors/chat-selectors'
import { all, call, put, takeEvery, select } from '@redux-saga/core/effects'
import { actions } from '../reducers/chat-reducer'
import { chatAPI, StatusType } from './../../api/chat-api'
import { ChatMessageAPIType } from './../../pages/Chat/ChatPage'
import { SEND_MESSAGE, SEND_MESSAGE_ERROR, START_MESSAGES_LISTENING, START_MESSAGES_LISTENING_ERROR, STOP_MESSAGES_LISTENING, STOP_MESSAGES_LISTENING_ERROR } from './../reducers/constants'

//* WORKERS ===================================================================================================================================

type ActionType = {
    payload: {
        messages: ChatMessageAPIType[]
        status: StatusType
    }
    message: string
}


function* startMessagesListening(action: ActionType | any): any {

    const messages = yield select(getMessages)
    const status = yield select(getStatus)

    const newMessageHandler = yield put(actions.messagesReceived(messages))
    const statusChangedHandler = yield put(actions.statusChanged(status))

    try {
        yield call(chatAPI.start)
        yield call(chatAPI.subscribe, 'message-received', newMessageHandler)
        yield call(chatAPI.subscribe, 'status-changed', statusChangedHandler)
    } catch {
        yield put({ type: START_MESSAGES_LISTENING_ERROR, error: 'Error fetching start messages listening' })
    }
}

function* stopMessagesListening(action: ActionType | any): any {

    const messages = yield select(getMessages)
    const status = yield select(getStatus)

    const newMessageHandler = yield put(actions.messagesReceived(messages))
    const statusChangedHandler = yield put(actions.statusChanged(status))

    try {
        yield call(chatAPI.unsubscribe, 'message-received', newMessageHandler)
        yield call(chatAPI.unsubscribe, 'status-changed', statusChangedHandler)
        yield call(chatAPI.stop)
    } catch {
        yield put({ type: STOP_MESSAGES_LISTENING_ERROR, error: 'Error fetching stop messages listening' })
    }
}

function* sendMessage(action: ActionType | any) {
    try {
        yield call(chatAPI.sendMessage, action.message)
    } catch {
        yield put({ type: SEND_MESSAGE_ERROR, error: 'Error fetching send message' })
    }
}

//* ============================================================================================================================================



//* WATCHERS ===================================================================================================================================

export function* watchStartMessagesListening() {
    yield takeEvery(START_MESSAGES_LISTENING, startMessagesListening)
}

export function* watchStopMessagesListening() {
    yield takeEvery(STOP_MESSAGES_LISTENING, stopMessagesListening)
}

export function* watchSendMessage() {
    yield takeEvery(SEND_MESSAGE, sendMessage)
}

//* ============================================================================================================================================


export function* chatRootSaga() {
    yield all([
        watchStartMessagesListening(),
        watchStopMessagesListening(),
        watchSendMessage()
    ])
}