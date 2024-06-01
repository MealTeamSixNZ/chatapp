class Message {
    datetime: Date
    content: string
    sender: string
    constructor(content: string, sender: string) {
        this.datetime = new Date()
        this.content = content
        this.sender = sender
    }
}
export default Message