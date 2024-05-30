import Message from "./Message"

class MessageService {
    messages: Message[] 
    constructor() {
        this.messages = []
    }
    getMessages() {
        return this.messages
    }
    createMessage(input: string) {
        const message = new Message(input)
        this.messages.push(message)
    }
}

export default MessageService