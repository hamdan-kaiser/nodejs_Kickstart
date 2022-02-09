const EventEmitter = require('events')

const http = require('http')

//create a server
http.createServer((req,res) =>{
    if(req.url == '/api/courses')
        res.write("You unlocked the phase")
        res.end() 
}).listen(3000)

/***
 * so an event can trigger a function. But to conncect
 * the localhost, you must have to establish a connection first
 */
//initialize emmitter
const event = new EventEmitter()

event.addListener('Message Received', (e)=>{
        console.log("Welcome to our channel ",e)
})

//fire an emmit
event.emit('Message Received', {id: 1, subject: "English"})



