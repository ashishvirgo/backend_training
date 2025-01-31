const express = require("express")
const db=require('./config/dbconfig')
const Product=require('./models/productModel.js')
const app = express();
app.use(express.json());
app.get('/', async (req, res) => {
    res.send("Server is working");
});
app.post('/api/v1/products', async (req, res) => {
    const newProduct=req.body;
    const doc= await Product.create(newProduct);
    res.status(201);
    res.json({
        status: "success",
        data: doc,
    })
});

app.listen(1500,()=>{
    console.log("server is running on port 1500");

})