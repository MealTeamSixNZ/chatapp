const send = document.getElementById("sendButton")
const input = document.getElementById("input")
const messages = document.getElementById("messages")
send.addEventListener("click", () => {
    sendMessage()
})
setInterval(() => {
    updateMessages()
}, 1000)

function sendMessage() {
    const content = input.value
    input.value = ""
    fetch("http://localhost:3000/msgs", {
        method: "POST", 
        body: `msg=${content}`,
        headers: {
            "content-type": "application/x-www-form-urlencoded"
        }
    })
    .then(() => {
        updateMessages()
    })
}

function updateMessages() {
    fetch("/msgs").then((res) => {
        res.json().then((msgs) => {
            messages.replaceChildren()
            for (const msg of msgs) {
                const div = document.createElement("div")
                div.className = "message"
                div.innerText = msg
                messages.appendChild(div)
            }
        })
    })
}