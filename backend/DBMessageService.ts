import IMessageService from "./IMessageService";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";
import Message from "./Message";

class DBMessageService implements IMessageService {
    private db:Database<sqlite3.Database, sqlite3.Statement>
    constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
        this.db = db
    }
    async getMessages(): Promise<Message[]> {
        const sql = `SELECT content, user_ID, createdAt, message_ID FROM messages`
        const results = await this.db.all(sql)
        return results.map((result:{content:string, user_ID:number, createdAt:string, message_ID:number}) => {
            return new Message(result.content, result.user_ID, new Date(result.createdAt), result.message_ID)
        })
    }
    async createMessage(input:string, sender:number): Promise<Message> {
        const sql = `INSERT into messages (content, createdAt, user_ID) VALUES (?, datetime('now'), ?) RETURNING content, user_ID, createdAt, message_ID`
        const result = await this.db.get(sql, input, sender)
        return new Message(result.content, result.user_ID, new Date(result.createdAt), result.message_ID)
    }
    async setup(): Promise<void> {
        await this.db.exec(
            `CREATE TABLE IF NOT EXISTS messages (
                message_ID INTEGER NOT NULL UNIQUE, 
                content TEXT NOT NULL,
                user_ID INTEGER NOT NULL,
                createdAt TEXT NOT NULL,
                PRIMARY KEY("message_ID" AUTOINCREMENT),
                FOREIGN KEY("user_ID") REFERENCES users ("user_ID")
            )`
        )
    }
}
export default DBMessageService