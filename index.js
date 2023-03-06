const express= require('express')
const app= express()
const cors = require('cors')
const port = process.env.PORT | 5000;

// MiddleWare 
app.use(express.json())
app.use(cors())
require('dotenv').config()




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run (){
    try{
        const allCatagorisCollection= client.db("foodDeliveryDatabase").collection("allCatagoris")
        const allProductsCollection= client.db("foodDeliveryDatabase").collection("allProducts")


        app.get('/allCatagoris', async (req, res ) => {
            const filter= { }
            const result= await allCatagorisCollection.find(filter).toArray()
            res.send(result)
        })


        app.get('/itemsProducts/:title', async (req, res ) => {
            const title = req.params.title;
            const filter = {catagoris: title }
            const result = await allProductsCollection.find(filter).toArray()
            res.send(result)
        })


        
    }finally{

    }
}

run().catch(console.dir);




app.get('/', async (req, res)=>{
     res.send("Food Server is run client")
})

app.listen(port, ()=>{
    console.log(`Food server run ${port}`)
})
