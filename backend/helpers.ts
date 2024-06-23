

export async function hashPassword(password:string): Promise<string> {
    const encoder = new TextEncoder() 
    const data = encoder.encode(password+"sTXCG*7xnPPh5Bhqj7K%s9GM4tfCW3kBEoU6zBYBKxcjbm7b2x&ESZuZGscbgpw9$4sRm")
    const hash = await crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hash))
    const hashHex = hashArray.map((byte) => {return byte.toString(16).padStart(2, "0")}).join("")
    return hashHex
}