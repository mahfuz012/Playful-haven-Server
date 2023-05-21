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
    const dataall = await myCollection.find().toArray()
    res.send(dataall)
})

app.get('/finddata',async(req,res)=>{
  let query = {}

  if(req.query?.seller_email){
    query = {seller_email:req.query?.seller_email}
}

    const result = await myCollection.find(query).toArray()
    res.send(result)
})

app.get('/singledata/:id',async(req,res)=>{
      const getID = req.params.id
      const searchData = { _id: new ObjectId(getID)}
    const details = await myCollection.findOne(searchData)
    res.send(details)
})

app.post('/userdata', async(req,res)=>{
    const getData= req.body
    const dataall = await myCollection.insertOne(getData)
    res.send(dataall)
})



app.put('/update/:id', async(req,res)=>{
  const getBody = req.body
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