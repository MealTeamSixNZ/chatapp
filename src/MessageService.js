const Message = require("./Message")

class MessageService {
    constructor() {
        this.messages = []
    }
    getMessages() {
        return this.messages
    }
    createMessage(input) {
        const message = new Message(input)
        this.messages.push(message)
    }
}

module.exports=MessageService