import { cleanUp, subscribers, ws } from './main'

export const stopAPI = () => {
    subscribers['message-received'] = []
    subscribers['status-changed'] = []
    cleanUp()
    ws?.close()
}