import MessageService from "./MessageService"
import express from "express"
const app = express()
const port = 3000
const messageService = new MessageService()

app.use(express.json())
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

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})