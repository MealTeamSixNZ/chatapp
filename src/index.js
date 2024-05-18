console.log('hello world')

const express = require('express')
const app = express()
const port = 3000
const msgs = ["hallo","tschuss"]

app.use (express.urlencoded())
app.get (`/`, (req, res) => {
    res.send('hello world')
})

app.get (`/msgs`, (req, res) => {
    res.send(msgs)
})

app.post (`/msgs`, (req, res) =>{
    msgs.push(req.body.msg)
    res.send()
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})