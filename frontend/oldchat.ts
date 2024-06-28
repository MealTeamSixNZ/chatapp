// const send = document.getElementById("sendButton")! as HTMLButtonElement
// const input = document.getElementById("input")! as HTMLInputElement
// const messages = document.getElementById("messages")!
// send.addEventListener("click", async () => {
//     await sendMessage()
// })
// input.addEventListener("keyup", async (event) => {
//     if (input.value.length === 0) {
//         send.disabled = true
//     } else {
//         send.disabled = false
//         if (event.key === "Enter") {
//             await sendMessage()
//         }
//     }
// })

// async function sendMessage() {
//     const content = input.value
//     input.value = ""
//     send.disabled = true
//     const res = await fetch("http://localhost:3000/msgs", {
//         method: "POST", 
//         body: JSON.stringify({content:content}),
//         headers: {
//             "content-type": "application/json"
//         }
//     })
//     if (res.ok) {
//         await updateMessages()
//     } else {
//         alert("no.")
//     }
// }

// async function updateMessages() {
//     const res = await fetch("/msgs")
//     const msgs = await res.json()
//     messages.replaceChildren()
//     for (const msg of msgs) {
//         const div = buildMessageHTML(msg)
//         messages.appendChild(div)
//     }
// }

// function buildMessageHTML(msg:any) {
//     const div = document.createElement("div")
//     div.className = "message"
//     div.innerText = msg.content
//     return div
// }

// //websocket stuff
// const ws = new WebSocket("ws://localhost:3000/ws")
// ws.addEventListener("open", () => {
//     console.log("Connected")
// })
// ws.addEventListener("message",  (event:MessageEvent<string>) => {
//     const data = JSON.parse(event.data)
//     if (data.type = "new message") {
//         const message = data.message
//         const div = buildMessageHTML(message)
//         messages.appendChild(div)
//     }
// })
// updateMessages()