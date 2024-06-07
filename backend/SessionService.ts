import User from "./User"

class SessionService {
    private sessions: Map<string, string>
    constructor() {
       this.sessions = new Map()
    }
    create(username: string):SessionID {
        const sessionID = crypto.randomUUID()
        this.sessions.set(sessionID, username)
        return sessionID
    }
    revoke(sessionID: SessionID):void {
        this.sessions.delete(sessionID)
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