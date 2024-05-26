class Message {
    datetime: Date
    content: string
    constructor(content: string) {
        this.datetime = new Date()
        this.content = content
    }
}
export default Message