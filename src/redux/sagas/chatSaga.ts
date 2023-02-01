import { stopAPI } from './../../widgets/Chat/api/stop'
import { unsubscribeAPI } from './../../widgets/Chat/api/unsubscribe'
import { subscribeAPI } from './../../widgets/Chat/api/subscribe'
import { startAPI } from './../../widgets/Chat/api/start'
import { StatusType } from '../../widgets/Chat/api/main'
import { ChatMessageAPIType } from './../../entities/Message/index'
import { getMessages, getStatus } from '../../widgets/Chat/model/chat-selectors'
import { all, call, put, takeEvery, select } from '@redux-saga/core/effects'
import { actions } from '../../widgets/Chat/model/chat-actions'
import { SEND_MESSAGE, SEND_MESSAGE_ERROR, START_MESSAGES_LISTENING, START_MESSAGES_LISTENING_ERROR, STOP_MESSAGES_LISTENING, STOP_MESSAGES_LISTENING_ERROR } from '../../widgets/Chat/consts'
import { sendMessageAPI } from '../../widgets/Chat/api/sendMessage'

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
        yield call(startAPI)
        yield call(subscribeAPI, 'message-received', newMessageHandler)
        yield call(subscribeAPI, 'status-changed', statusChangedHandler)
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
        yield call(unsubscribeAPI, 'message-received', newMessageHandler)
        yield call(unsubscribeAPI, 'status-changed', statusChangedHandler)
        yield call(stopAPI)
    } catch {
        yield put({ type: STOP_MESSAGES_LISTENING_ERROR, error: 'Error fetching stop messages listening' })
    }
}

function* sendMessage(action: ActionType | any) {
    try {
        yield call(sendMessageAPI, action.message)
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