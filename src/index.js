class Message {
    datetime
    content
    constructor(content) {
        this.datetime = new Date()
        this.content = content
    }
}

const express = require('express')
const app = express()
const port = 3000
const msgs = [new Message("hallo"), new Message("tschuss")]

app.use(express.json())
app.use(express.static("public"))

app.get(`/msgs`, (req, res) => {
    res.send(msgs)
})

// this is where messages are created
app.post(`/msgs`, (req, res) => {
    if (req.body.content.length === 0) {
        res.status(400).end()
    } else {
        const msg = new Message(req.body.content)
        msgs.push(msg)
        res.send()
    }
    
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})