import Message from "./Message"

class MessageService {
    messages: Message[] 
    constructor() {
        this.messages = []
    }
    getMessages() {
        return this.messages
    }
    createMessage(input: string, sender: string) {
        const message = new Message(input, sender)
        this.messages.push(message)
    }
}

export default MessageService