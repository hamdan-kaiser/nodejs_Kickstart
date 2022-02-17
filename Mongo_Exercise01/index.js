
const Express = require('express')
const mongoose = require('mongoose')
const app = Express()

app.use(Express.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.send("OK!")
})


mongoose.connect('mongodb://localhost/practice_01')
            .then(()=> console.log("Server Connected!"))
                .catch(err => console.log(err))

//connecting with the collection

const schema = mongoose.Schema({

    address: {building: String,
                coord:[{0:Number,1:Number}],
                street:String,
                zipcode:String},
    borough: String,
    cuisine: String,
    grades: [
        {
            date: {type: Date},
            grade: String,
            score: Number
        }
    ],
    name: String,
    restaurant_id: String 
})

const collection = mongoose.model('restaurants',schema)

async function findData()
{
    const myData =await collection.find()
    console.log(myData)
}

findData()

const port = process.env.port || 3000
app.listen(port, ()=> console.log(`Listening to ${port}...`))