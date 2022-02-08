
//require('./main.js')

const http = require('http')

const hostName = '127.0.0.1';
const port = 3000;

const server = http.createServer((request,response) => {

    response.statusCode = 200;
    response.statusMessage = "OK";
    response.end(name("Hamdan"));
});

server.listen(port,(err) => {
    console.log(`Server Listening to http://${hostName}:${port}`);
});

var name = function hello(name) {
    console.log("This is " + name + "'s first code in Javascript")
}

var arr = new Map()
arr.set("Hamdan", 100);
arr.set("Richard", 200);
arr.set("Kraken", 300);

console.log(arr.get("Hamdan"))
/*function printSets()
{
    for(let i=0;i<arr.size;i++)
    {
        console.log(""+arr[i])
    }
}

printSets()*/

