const Express = require('express')
const joi = require('joi')
const route = Express.Router()

//route.use(Express.json())

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

route.get('/', (req,res) =>
{
    res.send("Welcome to our Pub")
})


route.get('/api/beers', (req,res) =>
{
    res.send(beers)

})

route.get('/api/beers/:id',(req,res) =>
{
    const IDCheck = beers.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        return res.status(400).send("Bad Request!")
    }


    res.send(beers[IDCheck -1])
})


route.post('/api/beers/', (req,res) =>{

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

route.put('/api/beers/:id', (req,res) =>
{
    const IDCheck = beers.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        return res.status(400).send("Bad Request/URL not found!")
    }

    IDCheck.type = req.body.type

    res.send(beers)
})


route.delete('/api/beers/:id', (req,res) =>
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

module.exports = route
