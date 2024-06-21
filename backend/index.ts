import MessageService from "./MessageService"
import express, { json } from "express"
import cookieParser from "cookie-parser"
import path from "path"
import User from "./User"
import SessionService from "./SessionService"
import UserService from "./UserService"
import http from "http"
import { WebSocketServer } from "ws"
import Message from "./Message"
import sqlite3 from "sqlite3"
import { open } from "sqlite"
import IUserService from "./IUserService"
import DBUserService from "./DBUserService"
import ISessionService from "./ISessionService"
import DBSessionService from "./DBSessionService"
import IMessageService from "./IMessageService"
import DBMessageService from "./DBMessageService"

(async () => {
    const db = await open({
        filename: './database.db',
        driver: sqlite3.Database
    })

    const app = express()
    const PORT = 3000
    const server = http.createServer(app)
    const messageService:IMessageService = new DBMessageService(db)
    const sessionService:ISessionService = new DBSessionService(db)
    const userService:IUserService = new DBUserService(db)
    await userService.setup()
    await sessionService.setup()
    await messageService.setup()
    // await userService.create("admin", "admin")
    // await userService.create("jesse", "password")
    // await userService.create("kirtus", "password1")

    app.use(express.json())
    app.use(express.urlencoded({extended:true}))
    app.use(express.static("public"))
    app.use(cookieParser())

    app.get(`/msgs`, async (req, res) => {
        if (await isUserSignedIn(req)) {
            res.send(await messageService.getMessages())
        } else {
            res.status(401).end()
        }
    })

    // this is where messages are created
    app.post(`/msgs`, async (req, res) => {
        if (await isUserSignedIn(req)) {
            if (req.body.content.length === 0) {
                res.status(400).end()
            } else {
                const userID = await sessionService.find(req.cookies.session)
                const user = await userService.find(userID)
                const msg = await messageService.createMessage(req.body.content, user.id)
                res.send()
                broadcastMessage(msg)
            }
        } else {
            res.status(401).end()
        } 
    })

    app.post(`/auth/sign_in`, async (req, res) => {
        console.log(req.body)
        const user = await userService.findByName(req.body.username)
        if (req.body.password === user.password) {
            const sessionID = await sessionService.create(user.id)
            res.cookie("session", sessionID)
            res.redirect("/")
            return
        }
        res.redirect("/login.html")
    })

    app.get(`/auth/sign_out`, async (req, res) => {
        await sessionService.revoke(req.cookies.session)
        res.clearCookie("session")
        res.redirect("/login.html")
    })

    app.get(`/`, async (req, res) => {
        if (await isUserSignedIn(req)) {
            res.sendFile("index.html", {root:path.join(__dirname, "..", "private")})
        } else {
            res.redirect("/login.html")
        }
    })
    async function isUserSignedIn(req: express.Request) {
        return await sessionService.exists(req.cookies.session)
    }
    // websocket stuff

    const wss = new WebSocketServer({server:server, path:"/ws"})
    wss.on("connection", () => {
        console.log("Connection Established...")
    })

    server.listen(PORT, () => {
        console.log(`Example app listening on port http://localhost:${PORT}`)
    })

    function broadcast(payload:any) {
        for (const ws of wss.clients) {
            ws.send(JSON.stringify(payload))
        }
    }
    function broadcastMessage(message:Message) {
        broadcast({
            type:"new message", message:message
        }) 
    }
})()
