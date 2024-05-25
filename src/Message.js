class Message {
    datetime
    content
    constructor(content) {
        this.datetime = new Date()
        this.content = content
    }
}
module.exports=Message