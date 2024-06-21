import Message from "./Message"


interface IMessageService {
    getMessages():Promise<Message[]>
    createMessage(input:string, sender:number):Promise<Message>
    setup():Promise<void>
}

export default IMessageService