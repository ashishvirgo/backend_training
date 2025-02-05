const express = require("express")
const db=require('./config/dbconfig.js')
const Product=require('./models/productModel.js')
const app = express();
app.use((req,res,next)=>{
    console.log('---->req.url',req.url);
    next();
})
app.use(express.json());
app.get('/api/v1/products', async (req, res) => {
    try{
        const {q="",size = 1,page = 1}=req.query;
        console.log("query=",q);
    const productQuery= Product.find();
    if(q.length>0){
        const reg=new RegExp(q,"i");
        console.log(reg);
        productQuery.where("title").regex(reg);
    }
    productQuery.sort("price title")
    const productQueryClone=productQuery.clone();
    productQuery.skip((page-1)* size)
    productQuery.limit(size)
    const products=await productQuery;
    const totalProducts=await productQueryClone.countDocuments();
    res.status(200);
    res.json({
        status: "success",
        data: products,
        total: totalProducts,
    })
}
catch(err){
    res.status(500);
    res.json({
        status: "fail",
        message: "internal server error",
    })
}
});
app.post('/api/v1/products', async (req, res) => {
    try{
        const newProduct=req.body;
        const doc= await Product.create(newProduct);
        res.status(201);
        res.json({
            status: "success",
            data: doc,
        })
    }
    catch(err){
        console.log(err.name);
        if(err.name=="ValidationError"){
            res.status(400);
        res.json({
            status: "fail",
            message: 'Data validation failed',
        })
        }
        else{
            res.status(500);
            res.json({
                status: "fail",
                message: 'Internal Server Error',
            }) 
        }
        // console.log("post products error",err.message);
        // res.status(500);
        // res.json({
        //     status: "Fail",
        // })
    }
    
});

app.listen(1500,()=>{
    console.log("server is running on port 1500");

})