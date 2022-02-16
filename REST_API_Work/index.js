const Express = require('express')
const log_data = require('./logger')
const mongoose = require('mongoose')
const route = require('./beers')
const app = Express()

app.use(Express.urlencoded({extended : true}))
app.use(Express.json())
app.use(Express.static('public/Shine_Academy'))
app.use('/', route)


mongoose.connect('mongodb://localhost/beers').then(()=> console.log("Connected....")).catch(err => console.log("Not Connected ",err))

const newSchema = new mongoose.Schema({
    id: String,
    type: String,
    isAvailable: Boolean

})

const beer = mongoose.model('beers',newSchema)

const addSchema = new beer({
    id: '1',
    type: 'Ale',
    isAvailable: true
})

addSchema.save().then(()=> console.log("Data Saved Successfully!")).catch(err => console.log("Database Failed!"))


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