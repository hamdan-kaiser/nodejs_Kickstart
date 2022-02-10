const Express = require('express')

const Joi = require('joi')

const app = Express()

//to post data from a JSON body, we need to use this line below
app.use(Express.json())


const courseList = [
    {
        id: 1,
        name: "English"
    },

    {
        id: 2,
        name: "Physics"
    },

    {
        id: 3,
        name: "Chemistry"
    },

    {
        id: 4,
        name: "Botany"
    }
]

app.get('/', (req,res) =>{
    res.send("Welcome")
})


app.get('/api/courses', (req,res) =>{

    res.send(courseList)
})

app.get('/api/courses/:id', (req,res) =>{

    let hasMatched = courseList.find(c => c.id === parseInt(req.params.id))
    if(!hasMatched)
    {
        res.status(404).send("No URL found! ")
    }
    res.send(courseList[req.params.id -1])
})

//update data

app.post('/api/courses', (req,res) =>
{
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result =  schema.validate(req.body.name)
    console.log(result)

    if(result.error)
    {
        res.status(500).send("Internal Server Error. "+result.error)
        return;
    }

    const addCourse = {
        id: courseList.length+1,
        name: req.body.name
    }

    courseList.push(addCourse)
    res.send(courseList)
})


//update any existing data..

app.put('/api/courses/:id', (req,res) =>{

    /***
     * First We need to check whether the given id is valid or not.
     * Secondly, the value we put is valid or not
     * If the above two is ok, then we put the value we want to modify
     */

    const courseName = courseList.find(c => c.id === parseInt(req.params.id))
    if(!courseName)
    {
        res.status(400).send("Bad Request")
        return;
    }

    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })
    const{err} = schema.validate(req.body.name)

    if(err)
    {
        res.status(500).send(err.result)
        return;
    }
    isMatched.name = req.body.name
    res.send(courseList)


})



//delete data
app.delete('/api/courses/:id', (req,res) =>
{
    //validate data
    const course = courseList.find(c => c.id ===parseInt(req.params.id))

    if(!course)
        return res.status(400).send("Bad Request")
    
    const index = courseList.indexOf(course)

    courseList.splice(index,1)

    res.send(courseList)
    
})

const port = process.env.port || 3000

app.listen(port, ()=> {console.log(`Connecting to ${port}`)})