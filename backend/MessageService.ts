import IMessageService from "./IMessageService"
import Message from "./Message"

class MessageService implements IMessageService {
    messages: Message[] 
    constructor() {
        this.messages = []
    }
    getMessages() {
        return Promise.resolve(this.messages)
    }
    createMessage(input: string, sender: number) {
        const message = new Message(input, sender, new Date(), this.messages.length)
        this.messages.push(message)
        return Promise.resolve(message)
    }
    setup() {
        return Promise.resolve()
    }
}

export default MessageService