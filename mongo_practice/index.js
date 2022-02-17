/***
 * NOTE: we MUST have to have call listen() 
 * function to listen to the port. 
 */

const Express = require('express')
const mongoose =  require('mongoose')
const app = Express()

app.use(Express.urlencoded({extended: true}))

//connect to a database

mongoose.connect('mongodb://localhost/second_db')
                            .then(()=> console.log("Connected!!"))
                    .catch(err => console.log(err))

//declare what type of data you want to add
//in Mongo, it's called create collection
const data_model =new mongoose.Schema({
    name: {type: String, required: true},
    class: String,
    marks: {type: Number, required: function() {return this.isPassed}},
    section: String,
    isPassed: Boolean
})

//create a collection
const create_collection = mongoose.model('second_db',data_model)

/**
 * Here's some notes for adding data:
 *  - calling find() will return everything
 *  Some pre-made calls are here and they're called as an object
 *  - eq(equal to)
 *  - ne(not equal)
 *  - gt(greater than)
 *  - gte(greater than or equal)
 *  - lt(less than)
 *  - lte(less than equal)
 *  - in(in an array for some specific value search)
 *  - nin(not in)
 */

//data find with different methods of queries
//async function findData()
//{
    //const find = await create_collection.find({name: {$eq: "Hamdan Kaiser"}}).select({class:1}) //string query
    //const find = await create_collection.find({marks: {$gte: 70}}).limit(10).select({name:1,class:1}) //Number query
    //const find = await create_collection.find({marks: {$in: [32, 36, 86]}}).limit(10).select({name:1,class:1}) //in between value query
    //const find = await create_collection.find({name: /^Ham/i}).limit(10).select({name:1,class:1}) //That starts with
    //const find = await create_collection.find({name: /r$/i}).limit(10).select({name:1,class:1}) //That ends with
   // const find = await create_collection.find({name: /.*an.*/i}).limit(10).select({name:1,class:1}) //That has in the middle
 //   console.log(find)
//}

//findData()

const add_data = new create_collection({
   // name: "Bodmas C",
    class: "Twelve",
    marks: 08,
    section: "B",
    isPassed: true
})

//save the data to the collection
try{
    add_data.save().then(()=> console.log("Data Saved")).catch(err => console.log(err))
}
catch(ex)
{
    console.log(ex)
}


app.get('/', (req,res) => {
    res.send("OK!")
})

const port = process.env.port || 3000
app.listen(port, ()=> console.log(`Connected to port ${port}....`))
