import User from "./User"

interface IUserService {
    create(name:string, password:string):User
    find(userID:number):User
    findByName(name:string):User
    exists(userID:number):boolean
    delete(userID:number):void
    setup():Promise<void>
}
export default IUserService