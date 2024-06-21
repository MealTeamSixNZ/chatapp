class Message {
    datetime: Date
    content: string
    sender: number
    ID: number
    constructor(content: string, sender: number, datetime:Date, ID:number ) {
        this.datetime = datetime
        this.content = content
        this.sender = sender
        this.ID = ID
    }
}
export default Message