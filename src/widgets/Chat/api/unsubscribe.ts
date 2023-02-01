import { EventsNamesType, MessagesReceivedSubscriberType, StatusChangedSubscriberType, subscribers } from './main'

export const unsubscribeAPI = (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
    // @ts-ignore
    subscribers[eventName] = subscribers[eventName].filter(s => s != callback)
}