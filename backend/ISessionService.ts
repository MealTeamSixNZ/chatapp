import SessionService, { SessionID } from "./SessionService";
import { UserID } from "./User";


interface ISessionService {
    create(UserID: UserID):Promise<SessionID>
    revoke(sessionID: SessionID):Promise<void>
    find(sessionID: SessionID):Promise<UserID>
    exists(sessionID: SessionID):Promise<boolean>
    setup():Promise<void>
}

export default ISessionService