const SESSION_LOG = "sessions.json"
import { json } from "express"
import fs from "fs"

class SessionService {
    private readsSessionsFromFile():void {
        if (!fs.existsSync(SESSION_LOG)) {
            return
        }
        const jason = fs.readFileSync(SESSION_LOG, {encoding:"utf-8"})
        const array = JSON.parse(jason)
        this.sessions = new Map(array)
    }
    private writeSessionsToFile():void {
        const entries = this.sessions.entries()
        const array = Array.from(entries)
        const jason = JSON.stringify(array)
        fs.writeFileSync(SESSION_LOG, jason)
    }
    
    private sessions: Map<string, string>
    constructor() {
       this.sessions = new Map()
       this.readsSessionsFromFile()
    }
    create(username: string):SessionID {
        const sessionID = crypto.randomUUID()
        this.sessions.set(sessionID, username)
        this.writeSessionsToFile()
        return sessionID
    }
    revoke(sessionID: SessionID):void {
        this.sessions.delete(sessionID)
        this.writeSessionsToFile()
    }
    find(sessionID: SessionID):string {
        const username = this.sessions.get(sessionID)
        if (username == undefined) {
            throw "invalid session"
        } else {
            return username
        }
    }
    exists(sessionID: SessionID):boolean {
        return this.sessions.has(sessionID)
    }
}
export type SessionID=string
export default SessionService