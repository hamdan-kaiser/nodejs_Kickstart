const http = require('http')

//create a server
const server = http.createServer((req,res) =>{
    if(req.url == '/api/courses')
    {
        res.write("You are in the main course section. ")
    }
    res.end("Everything is Okay!")
}).listen(3000)


//event module
server.addListener('Connection', e =>{
    console.log("Connected",e)
})

server.emit('Connection', {id:200, sratus: "OK"})