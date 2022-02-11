const Express = require('express')
const log_data = require('./logger')

const route = require('./beers')
const app = Express()

app.use(Express.urlencoded({extended : true}))
app.use(Express.json())
app.use(Express.static('public'))
app.use('/', route)

app.use(function(req,res,next)
{
    console.log("Working....")
    next()

})

app.use(log_data)

app.use(function(req,res,next)
{
    console.log("Authenticating....")
    next()

})




const port = process.env.port || 3000

app.listen(port, ()=> console.log(`Listening to port ${port}...`))