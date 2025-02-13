const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt");
require('./config/dbconfig.js');
const Product=require('./models/productModel.js')
const User=require('./models/userModel.js');
const OTP=require('./models/otpModel.js');
const sendEmail = require("./utils/emailHelper.js");
const app = express();
// app.use((req,res,next)=>{
//     console.log('---->req.url',req.url);
//     next();
// })
app.use(cors({origin: "http://localhost:5173"}))
app.use(express.json());
app.get('/api/v1/products', async (req, res) => {
    try{
        console.log("Ashuish")
        const {q="",size = 10,page = 1,fields="-__v -createdAt -updatedAt"}=req.query;
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
    productQuery.select(fields)
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
app.post("/api/v1/users", async(req,res)=>{
    try{
        const userInfo=req.body;
        const salt=await bcrypt.genSalt(14);
        const hashpassword=await bcrypt.hash(userInfo.password,salt)
        userInfo.password=hashpassword;
        const newUser= await User.create(userInfo);
        
        res.status(201);
        res.json({
            status: "success",
            data: {
                user: newUser,
            }
        })
    }   
    catch(err){
            console.log(err.name);
            if(err.name=="ValidationError"){
                res.status(400);
            res.json({
                status: "fail",
                message: 'Data validation failed'+err.message,
            })
            }
            else{
                res.status(500);
                res.json({
                    status: "fail",
                    message: 'Internal Server Error',
                }) 
            }
    }
});
app.post("/api/v1/otps",async(req,res)=>{
    try{
     const {email}=req.body;
     //email is required
     if(email && email.length>0){
     //otp is not sent on this email at least in last x=3 minutes 
     const otp=Math.floor(Math.random()*9000+1000);
     const isEmailSent=await sendEmail(email,otp);
     if(isEmailSent){
        const hashedotp=await bcrypt.hash(otp.toString(),14);
        await OTP.create({email,otp:hashedotp });
        res.status(201).json({status:"success", message: 'otp sent to email'})
     }
     else{
        res.status(500).json({status:"success", message: 'unable to send the otp'})  
     }
     }
     else{
     res.status(400).json({status: "fail", message: "Email is required!"})
     }
     
    }
    catch(err){
        console.log(err.name);
        if(err.name=="ValidationError"){
            res.status(400);
        res.json({
            status: "fail",
            message: 'Data validation failed'+err.message,
        })
        }
        else{
            res.status(500);
            res.json({
                status: "fail",
                message: 'Internal Server Error',
            }) 
        }
}
  })


app.listen(1500,()=>{
    console.log("server is running on port 1500");

})