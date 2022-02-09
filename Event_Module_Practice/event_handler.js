
const Logger = require('./logFiles')

const loggerFile = new Logger()

loggerFile.addListener('Connection Established', arg =>{

    console.log('Message Received',arg)
})

loggerFile.name('Event')