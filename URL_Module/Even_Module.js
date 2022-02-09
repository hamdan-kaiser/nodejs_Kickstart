
const LogMessage = require('./event_logger')

const message = new LogMessage()
//Adding a Listener to the event..

message.addListener('Logged in',(e) => {
    console.log('Logged',e)
})

message.printMessage('Logged')
