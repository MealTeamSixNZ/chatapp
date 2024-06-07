import MessageService from "./MessageService"
import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
import User from "./User"
import SessionService from "./SessionService"
const app = express()
const PORT = 3000
const messageService = new MessageService()
const users:User[] = [{name:`admin`, id:1, password:`admin`}, {name:'Jesse', id:2, password:"password"}, {name:'Kirtus', id:3, password:"password1"}]
const sessionService = new SessionService()

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
            const username = sessionService.find(req.cookies.session)
            messageService.createMessage(req.body.content, username)
            res.send()
        }
    } else {
        res.status(401).end()
    } 
})

app.post(`/auth/sign_in`, (req, res) => {
    console.log(req.body)
    for (const user of users) {
        if (req.body.username === user.name && req.body.password === user.password) {
            const sessionID = sessionService.create(user.name)
            res.cookie("session", sessionID)
            res.redirect("/")
            return
        }
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