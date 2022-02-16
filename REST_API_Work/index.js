const Express = require('express')
const log_data = require('./logger')
const mongoose = require('mongoose')
const route = require('./beers')
const app = Express()

app.use(Express.urlencoded({extended : true}))
app.use(Express.json())
app.use(Express.static('public/Shine_Academy'))
app.use('/', route)

/***
 * down to the following lines, it allows you to
 * connect with the database. if there are no such database
 * exist, then it creates by the name of path.
 */
mongoose.connect('mongodb://localhost/beers').then(()=> console.log("Connected....")).catch(err => 
                    console.log("Not Connected ",err))

const newSchema = new mongoose.Schema({
    id: String,
    type: String,
    isAvailable: Boolean

})

//create a database if not exist
const beer = mongoose.model('beers',newSchema)

//add data into created database/collection
/*const addSchema = new beer({
    id: '1',
    type: 'Ale',
    isAvailable: true
})

//to dave the added data
addSchema.save().then(()=> console.log("Data Saved Successfully!")).catch(err => console.log("Database Failed!"))*/

async function findData()
{
    const findName =await beer.find()

    console.log(findName)

}

findData()


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