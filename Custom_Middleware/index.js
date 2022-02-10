const Express = require('express')
const log_data = require('./logger')
const joi = require('joi')

const app = Express()


app.use(Express.urlencoded({extended : true}))
app.use(Express.json())

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


const beers  = [
    {
        id:1,
        type: "Crafts"
    },
    {
        id:2,
        type: "Rum"
    },
    {
        id:3,
        type: "Whiskey"
    },
    {
        id:4,
        type: "Vodka"
    }
]

app.get('/', (req,res) =>
{
    res.send("Welcome to our Pub")
})


app.get('/api/beers', (req,res) =>
{
    res.send(beers)

})

app.get('/api/beers/:id',(req,res) =>
{
    const IDCheck = beers.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        return res.status(400).send("Bad Request!")
    }


    res.send(beers[IDCheck -1])
})


app.post('/api/beers/', (req,res) =>{

    const schema = joi.object({
        type: joi.string().min(3).required()
    })

    const {err} = schema.validate(req.params.body)

    if(err)
    {
        return res.status(400).send("Bad Request")
    }

    const addBeer = {
        id: beers.length+1,
        type: req.body.type
    }

    beers.push(addBeer)

    res.send(beers)

})

app.put('/api/beers/:id', (req,res) =>
{
    const IDCheck = beers.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        return res.status(400).send("Bad Request/URL not found!")
    }

    IDCheck.type = req.body.type

    res.send(beers)
})


app.delete('/api/beers/:id', (req,res) =>
{
    const IDCheck = beers.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        res.status(400).send("Bad URL Request")
    }

    const index = beers.indexOf(IDCheck)

    beers.slice(index,1)

    res.send(beers)
})


const port = process.env.port || 3000

app.listen(port, ()=> console.log(`Listening to port ${port}...`))