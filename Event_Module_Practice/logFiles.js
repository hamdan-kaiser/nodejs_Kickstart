const EventEmitter = require('events')

class Logger extends EventEmitter{
    name(params) {
        console.log(params)
        this.emit('Connection Established', {id: 200, status: "OK"})
    }
}

module.exports = Logger