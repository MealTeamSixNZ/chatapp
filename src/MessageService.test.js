const MessageService = require("./MessageService")

test('check MessageService starts empty', () => {
    const sut = new MessageService()
    expect(sut.getMessages()).toEqual([])
})

test('check adding message gets added to MessageService', () => {
    const sut = new MessageService()
    sut.createMessage("New Message!")
    expect(sut.getMessages()).toHaveLength(1)
    expect(sut.getMessages()[0].content).toEqual("New Message!")
})