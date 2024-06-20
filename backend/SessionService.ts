const SESSION_LOG = "sessions.json"
import { json } from "express"
import fs from "fs"
import User, { UserID } from "./User"
import ISessionService from "./ISessionService"


class SessionService implements ISessionService {
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
    
    private sessions: Map<SessionID, UserID>
    constructor() {
       this.sessions = new Map()
       this.readsSessionsFromFile()
    }
    create(userID: UserID):Promise<SessionID> {
        const sessionID = crypto.randomUUID()
        this.sessions.set(sessionID, userID)
        this.writeSessionsToFile()
        return Promise.resolve(sessionID)
    }
    revoke(sessionID: SessionID):Promise<void> {
        this.sessions.delete(sessionID)
        this.writeSessionsToFile()
        return Promise.resolve()
    }
    find(sessionID: SessionID):Promise<UserID> {
        const userID = this.sessions.get(sessionID)
        if (userID == undefined) {
            throw "invalid session"
        } else {
            return Promise.resolve(userID)
        }
    }
    exists(sessionID: SessionID):Promise<boolean> {
        return Promise.resolve(this.sessions.has(sessionID))
    }
    setup():Promise<void> {
        return Promise.resolve()
    }
}
export type SessionID=string
export default SessionService