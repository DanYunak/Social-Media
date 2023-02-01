import { EventsNamesType, MessagesReceivedSubscriberType, StatusChangedSubscriberType, subscribers } from './main'

export const subscribeAPI = (eventName: EventsNamesType, callback: MessagesReceivedSubscriberType | StatusChangedSubscriberType) => {
    // @ts-ignore
    subscribers[eventName].push(callback)
}