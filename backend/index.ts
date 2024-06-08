import MessageService from "./MessageService"
import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import User from "./User"
import SessionService from "./SessionService"
import UserService from "./UserService"
const app = express()
const PORT = 3000
const messageService = new MessageService()
const sessionService = new SessionService()
const userService = new UserService()
userService.create("admin", "admin")
userService.create("jesse", "password")
userService.create("kirtus", "password1")

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())

app.get(`/msgs`, (req, res) => {
    if (isUserSignedIn(req)) {
        res.send(messageService.getMessages())
    } else {
        res.status(401).end()
    }
})

// this is where messages are created
app.post(`/msgs`, (req, res) => {
    if (isUserSignedIn(req)) {
        if (req.body.content.length === 0) {
            res.status(400).end()
        } else {
            const userID = sessionService.find(req.cookies.session)
            const user = userService.find(userID)
            messageService.createMessage(req.body.content, user.name)
            res.send()
        }
    } else {
        res.status(401).end()
    } 
})

app.post(`/auth/sign_in`, (req, res) => {
    console.log(req.body)
    const user = userService.findByName(req.body.username)
    if (req.body.password === user.password) {
        const sessionID = sessionService.create(user.id)
        res.cookie("session", sessionID)
        res.redirect("/")
        return
    }
    res.redirect("/login.html")
})

app.get(`/auth/sign_out`, (req, res) => {
    sessionService.revoke(req.cookies.session)
    res.clearCookie("session")
    res.redirect("/login.html")
})

app.get(`/`, (req, res) => {
    if (isUserSignedIn(req)) {
        res.sendFile("index.html", {root:path.join(__dirname, "..", "private")})
    } else {
        res.redirect("/login.html")
    }
})
function isUserSignedIn(req: express.Request) {
    return sessionService.exists(req.cookies.session)
}

app.listen(PORT, () => {
    console.log(`Example app listening on port http://localhost:${PORT}`)
})