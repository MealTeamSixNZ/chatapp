import IUserService from "./IUserService";
import User from "./User";
 
class UserService implements IUserService {
    private users:User[]
    private maxID:number
    constructor() {
        this.users = []
        this.maxID = 0
    }
    setup(): Promise<void> {
        return Promise.resolve()
    }
    create(name:string, password:string):Promise<User> {
        const ID = this.maxID
        this.maxID += 1
        const user = {
            id: ID,
            name: name,
            password: password
        }
        this.users.push(user)
        return Promise.resolve(user)
    }
    find(userID:number):Promise<User> {
        const user = this.users.find((user) => {
            return user.id === userID
        })
        if (user == undefined) {
            throw "not found"
        } else {
            return Promise.resolve(user)
        }
    }
    findByName(name:string):Promise<User> {
        const user = this.users.find((user) => {
            return name === user.name
        })
        if (user == undefined) {
            throw "not found"
        } else {
            return Promise.resolve(user)
        }       
    }
    exists(userID:number):Promise<boolean> {
        const userFound = this.users.some((user) => {
            return user.id === userID
        })
        return Promise.resolve(userFound)
    }
    delete(userID:number):Promise<void> {
        const userIndex = this.users.findIndex((user) => {
            return user.id === userID
        })
        if (userIndex === -1) {
            return Promise.resolve()
        } else {
            this.users.splice(userIndex, 1)
            return Promise.resolve()
        }
    }
}
export default UserService