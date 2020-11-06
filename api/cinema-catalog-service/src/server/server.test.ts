import server from "./server"

function apiMock() {
    console.log('API Mock')
}

test('Server Start', () => {
    server.start(apiMock, null, (err, server) => {
        expect(err).toBeNull()
        expect(server).not.toBeNull()
    })
})

test('Server Stop', () => {
    expect(server.stop()).toEqual(true)
})