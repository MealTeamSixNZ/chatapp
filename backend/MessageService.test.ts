const MessageService = require("./MessageService")

test('check MessageService starts empty', async () => {
    const sut = new MessageService()
    await sut.setup()
    expect(await sut.getMessages()).toEqual([])
})

test('check adding message gets added to MessageService', async () => {
    const sut = new MessageService()
    await sut.setup()
    await sut.createMessage("New Message!")
    expect(await sut.getMessages()).toHaveLength(1)
    expect(await sut.getMessages()[0].content).toEqual("New Message!")
})