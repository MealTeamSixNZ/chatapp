import User from "./User";
 
class UserService {
    private users:User[]
    private maxID:number
    constructor() {
        this.users = []
        this.maxID = 0
    }
    create(name:string, password:string):User {
        const ID = this.maxID
        this.maxID += 1
        const user = {
            id: ID,
            name: name,
            password: password
        }
        this.users.push(user)
        return user
    }
    find(userID:number):User {
        const user = this.users.find((user) => {
            return user.id === userID
        })
        if (user == undefined) {
            throw "not found"
        } else {
            return user
        }
    }
    findByName(name:string):User {
        const user = this.users.find((user) => {
            return name === user.name
        })
        if (user == undefined) {
            throw "not found"
        } else {
            return user
        }       
    }
    exists(userID:number):boolean {
        const userFound = this.users.some((user) => {
            return user.id === userID
        })
        return userFound
    }
    delete(userID:number):void {
        const userIndex = this.users.findIndex((user) => {
            return user.id === userID
        })
        if (userIndex === -1) {
            return
        } else {
            this.users.splice(userIndex, 1)
        }
    }
}
export default UserService