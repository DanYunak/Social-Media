import { ChatMessageAPIType } from '../../../entities/Message/index'

export type StatusType = 'pending' | 'ready' | 'error'

export type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void
export type StatusChangedSubscriberType = (status: StatusType) => void

export let subscribers = {
    'message-received': [] as MessagesReceivedSubscriberType[],
    'status-changed': [] as StatusChangedSubscriberType[]
}

export let ws: WebSocket | null = null

export type EventsNamesType = 'message-received' | 'status-changed'

export const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers['status-changed'].forEach(s => s(status))
}

export const closeHandler = () => {
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}

export const messageHandler = (e: MessageEvent) => {
    const newMessages = JSON.parse(e.data)
    subscribers['message-received'].forEach(s => s(newMessages))
}

export const openHandler = () => {
    notifySubscribersAboutStatus('ready')
}

export const errorHandler = () => {
    notifySubscribersAboutStatus('error')
    console.error('REFRESH PAGE')
}

export const cleanUp = () => {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.removeEventListener('open', openHandler)
    ws?.removeEventListener('error', errorHandler)
}

export function createChannel() {
    cleanUp()
    ws?.close()

    ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx')
    notifySubscribersAboutStatus('pending')

    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('open', openHandler)
    ws.addEventListener('error', errorHandler)
}