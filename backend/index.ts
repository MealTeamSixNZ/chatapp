import MessageService from "./MessageService"
import express from "express"
import cookieParser from "cookie-parser"
import path from "path"
const app = express()
const port = 3000
const messageService = new MessageService()
const USERNAME = "admin"
const PASSWORD = "admin"

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
            messageService.createMessage(req.body.content)
            res.send()
        }
    } else {
        res.status(401).end()
    } 
})

app.post(`/auth/sign_in`, (req, res) => {
    console.log(req.body)
    if (req.body.username === USERNAME && req.body.password === PASSWORD) {
        res.cookie("username", USERNAME)
        res.redirect("/")
    } else {
        res.redirect("/login.html")
    }
})

app.get(`/auth/sign_out`, (req, res) => {
    res.clearCookie("username")
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
    return USERNAME === req.cookies?.username
}
app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})