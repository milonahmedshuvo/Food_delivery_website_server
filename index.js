const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT | 5000;

// MiddleWare 
app.use(express.json())
app.use(cors())
require('dotenv').config()




const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const allCatagorisCollection = client.db("foodDeliveryDatabase").collection("allCatagoris")
        const allProductsCollection = client.db("foodDeliveryDatabase").collection("allProducts")
        const addToCartCollection = client.db("foodDeliveryDatabase").collection("allAddToCart")


        app.get('/allCatagoris', async (req, res) => {
            const filter = {}
            const result = await allCatagorisCollection.find(filter).toArray()
            res.send(result)
        })

        app.get('/catagorisName', async (req, res) => {
            const filter = {}
            const result = await allCatagorisCollection.find(filter).project({ title: 1 }).toArray()
            res.send(result)
        })


        app.get('/itemsProducts/:title', async (req, res) => {
            const title = req.params.title;
            const filter = { catagoris: title }
            const result = await allProductsCollection.find(filter).toArray()
            res.send(result)
        })


        app.get('/allfood', async (req, res) => {
            const query = {}
            const result = await allProductsCollection.find(query).toArray()
            res.send(result)
        })


        // app.post('/allcart', async(req, res)=>{
        //     const cartProduct = req.body 
        //     const query = {productId: cartProduct.productId}

        //     const isCart = await addToCartCollection.findOne(query)
        //     console.log("query:", query, "isCart:", isCart)
        //     // if(isCart){
        //     //    const oldQuentity = req.body.quantity

        //     //    const newQuantity: oldQuentity + 1
        //     // }


        //         const result = await addToCartCollection.insertOne(cartProduct)
        //     res.send(result)
        //     console.log(result)

        // })



        app.post('/allcart', async (req, res) => {
            const cartProduct = req.body
            const result = await addToCartCollection.insertOne(cartProduct)
            res.send(result)
            console.log(result)

        })




    } finally {

    }
}

run().catch(console.dir);




app.get('/', async (req, res) => {
    res.send("Food Server is run client")
})

app.listen(port, () => {
    console.log(`Food server run ${port}`)
})
