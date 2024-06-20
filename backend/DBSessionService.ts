import ISessionService from "./ISessionService";
import { Database } from "sqlite";
import sqlite3 from "sqlite3";

class DBSessionService implements ISessionService {
    private db:Database<sqlite3.Database, sqlite3.Statement>
    constructor(db: Database<sqlite3.Database, sqlite3.Statement>) {
        this.db = db 
    }
    async create(UserID: number): Promise<string> {
        const sessionID = crypto.randomUUID()
        const sql = `INSERT into sessions (session_ID, user_ID) VALUES (?, ?)`
        await this.db.run(sql, sessionID, UserID)
        return sessionID
    }
    async revoke(sessionID: string): Promise<void> {
        const sql = `DELETE FROM sessions WHERE session_ID = ?`
        await this.db.run(sql, sessionID)
    }
    async find(sessionID: string): Promise<number> {
        const sql = `SELECT user_ID FROM sessions WHERE session_ID = ?`
        const result = await this.db.get(sql, sessionID)
        if (result == undefined) {
            throw "undefined session"
        } else {
            return result.user_ID
        }
    }
    async exists(sessionID: string): Promise<boolean> {
        const sql = `SELECT 1 from sessions where session_ID = ?`
        const result = await this.db.get(sql, sessionID)
        return result != undefined
    }
    async setup() {
        await this.db.exec(
            `CREATE TABLE IF NOT EXISTS sessions (
                session_ID TEXT NOT NULL UNIQUE COLLATE NOCASE,
                user_ID INTEGER NOT NULL,
                PRIMARY KEY("session_ID"),
                FOREIGN KEY("user_ID") REFERENCES users ("user_ID")
            )`
        )
    }
}
export default DBSessionService