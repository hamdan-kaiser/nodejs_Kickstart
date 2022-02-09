const EventEmitter = require('events');

class LogMessage extends EventEmitter{
    printMessage(message)
    {
        console.log(message)
        this.emit('Logged in', {id: 1, message: "200 OK"})

    }
    
}

module.exports = LogMessage