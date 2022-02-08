const http = require('http')

const file = require('fs')

//create server first

http.createServer((req,res) => {

    //read file
    file.readFile('form.html', function(err, data)
    {
        res.write(data)
        res.end()
    })

    //write file - it will replace the element of the first parameter
/*    file.writeFile('test.txt','I have Written something  ', err =>{
        if(err)
        {
            console.log(err)
        }
    })*/


    /// append - create a new file and add the data at the target file
    file.appendFile('test.txt','I am added', err => {
        if(err)
            console.log(err)
    })

  /*  file.unlink('test.txt', err =>
    {
        if(err) throw err;
        console.log("File Deleted!")
    })*/
    
}).listen(3000)

