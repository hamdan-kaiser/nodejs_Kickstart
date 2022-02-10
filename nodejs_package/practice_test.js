/***
 * This REST API test project will represents some
 * data from a given array in a JSON format.
 * I will be using Postman to check all the methods.
 * 
 * This Project is Maintained by Hamdan Kaiser.
 * Date of prepared: 10 Feb 2022. 02:09
 */

//add the required packages first. All the packages are installed in node_modules folder
const { response } = require('express')
const Express = require('express')

const joi = require('joi')

const app = Express()

//for the post section, we are going to use the following line below

app.use(Express.json())

const music_category = [
    {
        id: 1,
        type: "pop"
    },
    {
        id: 2,
        type: "rock"
    },
    {
        id: 3,
        type: "hip-hop"
    },
    {
        id: 4,
        type: "rnb"
    }
    
]

//here's the methods starts for API
app.get('/', (req,res) =>
{
    res.send("Welcome to our music club")
})

app.get('/api/category', (req,res) => {

    res.send(music_category)
})

app.get('/api/category/:id', (req,res) => {

    const checkID =  music_category.find(c => c.id === parseInt(req.params.id))

    if(!checkID)
    {
        return res.status(400).send("Bad request")
    }

    
    res.send(music_category[req.params.id -1])
})


app.post('/api/category/', (req,res) => {

    const schema = joi.object({
        type : joi.string().min(3).max(8).required()
    })

    const result = schema.validate(req.params.body)

    if(!result)
    {
        return res.status(404).send("Invalid Input! "+result.error)
    }

    const addCat = {
        id: music_category.length +1,
        type: req.body.type
    }

    music_category.push(addCat)

    res.send(music_category)
})


app.put('/api/category/:id', (req,res) =>
{
    const schema = joi.object({
        type : joi.string().min(3).required()
    })

    const result  = schema.validate(req.body.type)

    if(!result)
    {
        return res.send("Bad Request")
    }

    const IDCheck = music_category.find(c => c.id === parseInt(req.params.id))

    if(!IDCheck)
    {
        return res.send("Not Found!")
    }

    IDCheck.type = req.body.type
    res.send(music_category)

})

app.delete('/api/category/:id', (req,res) => {

        const IDCheck = music_category.find(c => c.id === parseInt(req.params.id))

        const schema = joi.object({
            type : joi.string().min(3).required()
        })

        const {err} = schema.validate(req.body.type)

        if(err)
        {
            return res.send("Not Found ",err.error)
        }

        if(!IDCheck)
        {
            return res.send("Not Found")
        }

        //select the index
        const index = music_category.indexOf(IDCheck)

        //remove the selected index from the array
        music_category.splice(index,1)

        res.send(music_category)

})

const port = process.env.port || 3000

app.listen(port, ()=> console.log(`Listening to port ${port}...`))
