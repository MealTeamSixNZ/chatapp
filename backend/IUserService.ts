import User from "./User"

interface IUserService {
    create(name:string, password:string):Promise<User>
    find(userID:number):Promise<User>
    findByName(name:string):Promise<User>
    exists(userID:number):Promise<boolean>
    delete(userID:number):Promise<void>
    setup():Promise<void>
}
export default IUserService