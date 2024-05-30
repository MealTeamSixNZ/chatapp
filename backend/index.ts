import MessageService from "./MessageService"
import express from "express"
const app = express()
const port = 3000
const messageService = new MessageService()
const USERNAME = "admin"
const PASSWORD = "admin"

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))

app.get(`/msgs`, (req, res) => {
    res.send(messageService.getMessages())
})

// this is where messages are created
app.post(`/msgs`, (req, res) => {
    if (req.body.content.length === 0) {
        res.status(400).end()
    } else {
        messageService.createMessage(req.body.content)
        res.send()
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

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})