const send = document.getElementById("sendButton")
const input = document.getElementById("input")
const messages = document.getElementById("messages")
send.addEventListener("click", async () => {
    await sendMessage()
})
setInterval( async () => {
    await updateMessages()
}, 1000)
input.addEventListener("keyup", async (event) => {
    if (event.target.value.length === 0) {
        send.disabled = true
    } else {
        send.disabled = false
        if (event.key === "Enter") {
            await sendMessage()
        }
    }
})

async function sendMessage() {
    const content = input.value
    input.value = ""
    send.disabled = true
    const res = await fetch("http://localhost:3000/msgs", {
        method: "POST", 
        body: JSON.stringify({content:content}),
        headers: {
            "content-type": "application/json"
        }
    })
    if (res.ok) {
        await updateMessages()
    } else {
        alert("no.")
    }
}

async function updateMessages() {
    const res = await fetch("/msgs")
    const msgs = await res.json()
    messages.replaceChildren()
    for (const msg of msgs) {
        const div = document.createElement("div")
        div.className = "message"
        div.innerText = msg.content
        messages.appendChild(div)
    }
}