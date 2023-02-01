import { ws } from './main'

export const sendMessageAPI = (message: string) => {
    ws?.send(message)
}