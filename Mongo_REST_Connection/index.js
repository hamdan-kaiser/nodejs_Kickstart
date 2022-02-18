const Express = require('express')
const app = Express()
const port = process.env.port || 3000
//const route = require('./public')
app.use(Express.urlencoded({extended: true}))
app.use(Express.json())
app.use(Express.static('./public'))
//app.use('/',route)

app.get('/', (req,res)=>{
    res.status(200)
    res.send("Entered")
})

app.listen(port, ()=> console.log(`Connected to port ${port}..`))