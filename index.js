const express = require('express')
const app = express()

const cors = require('cors');

require('dotenv').config()
const port = process.env.PORT || 5000


app.use(cors())
app.use(express.json())




app.get('/', (req, res) => {
  res.send('Hello World!')
})




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.S3_USER}:${process.env.SECRET_KEY}@cluster0.scwz6ce.mongodb.net/?retryWrites=true&w=majority`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
  
      //  client.connect();



    const database = client.db("playful-heaven");
    const myCollection = database.collection("heaven-collection");



app.get('/userdata',async(req,res)=>{
  const limit = 20
    const dataall = await myCollection.find().limit(limit).toArray()
    res.send(dataall)
})


app.get('/singledata/:id',async(req,res)=>{
  const getID = req.params.id
  const searchData = { _id: new ObjectId(getID)}
const details = await myCollection.findOne(searchData)
res.send(details)
})




// app.get('/finddata',async(req,res)=>{
//   let query = {}

//   if(req.query?.seller_email){
//     query = {seller_email:req.query?.seller_email}
// }

// let sortQuery = {};

//   if (req.query?.sort === 'ascending') {
//     sortQuery = { Price: 1 };
//   } else if (req.query?.sort === 'descending') {
//     sortQuery = { Price: -1 };
//   }

//   const result = await myCollection.find(query).sort(sortQuery).toArray();
//     res.send(result)
// })

// app.get('/searchdata',async(req,res)=>{
//   let query = {}

//   if(req.query?.Sub_category){
//     query = {Sub_category:req.query?.Sub_category}
// }

//     const result = await myCollection.find(query).toArray()
//     res.send(result)
// })



app.get('/finddata', async (req, res) => {
  let query = {};

  if (req.query?.seller_email) {
    query = { seller_email: req.query?.seller_email };
  }

  let sortQuery = {};

  if (req.query?.sort === 'ascending') {
    sortQuery = { Price: 1 };
  } else if (req.query?.sort === 'descending') {
    sortQuery = { Price: -1 };
  }

  const result = await myCollection.aggregate([
    { $match: query },
    { $addFields: { numericPrice: { $toDouble: "$Price" } } },
    { $sort: { numericPrice: sortQuery.Price } },
    { $project: { _id: 1, seller_name: 1, Name: 1, Sub_category: 1, Price: 1, Available_quantity: 1 } }
  ]).toArray();

  res.send(result);
});




















app.get('/namedata',async(req,res)=>{
  let query = {}

  if(req.query?.Name){
    query = {Name:req.query?.Name}
}

    const result = await myCollection.find(query).toArray()
    res.send(result)
})






app.post('/userdata', async(req,res)=>{
  const getData= req.body
  const dataall = await myCollection.insertOne(getData)
  res.send(dataall)
})



app.delete('/deletedata/:id',async(req,res)=>{
  const getID = req.params.id
  const searchData = { _id: new ObjectId(getID)}
const result = await myCollection.deleteOne(searchData)
res.send(result)
})


app.put('/update/:id', async(req,res)=>{
  const getBody = req.body
  console.log(getBody);
  const getID = req.params.id
  const searchData = { _id: new ObjectId(getID)}


  const setID = {

    $set:{
      image_url:getBody.image_url,
      Name:getBody.Name,
      seller_email:getBody.seller_email,
      Rating:getBody.Rating,
      Sub_category:getBody.Sub_category,
      seller_name:getBody.seller_name,
      Available_quantity:getBody.Available_quantity,
      Price:getBody.  Price,
      Detail_description:getBody.Detail_description
    }
}


const updataData = await myCollection.updateOne(searchData,setID)
res.send(updataData)
})










   
  } finally {


  }
}


run().catch(console.dir);














app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})