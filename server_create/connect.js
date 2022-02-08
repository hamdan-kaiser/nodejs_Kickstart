
/// A different approach to create a server

const http = require('http')
const { hostname } = require('os')

const hostName = '127.0.0.1'

const port = 3000

const server = http.createServer((req, res) =>{
    res.end("200 OK")
}).listen(port)

//server.listen(port,(err) =>{
  //  console.log(`http://${hostName}:${port}`)
//})