require("dotenv").config();
const express = require("express")
const cors = require("cors")
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");
require('./config/dbconfig.js');
const Product = require('./models/productModel.js')
const User = require('./models/userModel.js');
const OTP = require('./models/otpModel.js');
const sendEmail = require("./utils/emailHelper.js");
const app = express();

app.use(cors({
    credentials: true, 
    origin: "https://backend-training-chi.vercel.app" }))

app.use(express.json());

app.get('/api/v1/products', async (req, res) => {
    try {
        console.log("Ashuish")
        const { q = "", size = 10, page = 1, fields = "-__v -createdAt -updatedAt" } = req.query;
        console.log("query=", q);
        const productQuery = Product.find();
        if (q.length > 0) {
            const reg = new RegExp(q, "i");
            console.log(reg);
            productQuery.where("title").regex(reg);
        }
        productQuery.sort("price title")
        const productQueryClone = productQuery.clone();
        productQuery.skip((page - 1) * size)
        productQuery.limit(size)
        productQuery.select(fields)
        const products = await productQuery;
        const totalProducts = await productQueryClone.countDocuments();
        res.status(200);
        res.json({
            status: "success",
            data: products,
            total: totalProducts,
        })
    }
    catch (err) {
        res.status(500);
        res.json({
            status: "fail",
            message: "internal server error",
        })
    }
});

app.post("/api/v1/users", async (req, res) => {
    try {
        const { otp, email, password } = req.body;
        if (!otp || !email || !password) {
            res.status(400)
                .json({
                    status: "fail",
                    message: "email,otp and password required"
                });
                return;
        }
        // otp that is sent within last 3 minutes
        // const otpDoc=await OTP.findOne({
        //     createdAt: {
        //         $gt: Date.now() -10 *60 *1000,
        //     },
        //     email: email,
        // });
        const otpDoc = await OTP.findOne()
            .where("createdAt")
            .gte(Date.now() - 10 * 60 * 1000)
            .where("email")
            .equals(email);
        // res.json(otpDoc);
        if (otpDoc === null) {
            res.status(400);
            res.json({
                statusbar: "fail",
                message: "Either otp has expired or was not sent"
            })
            return;
        }
        const hashedOtp = otpDoc.otp;
        const isOTPValid = await bcrypt.compare(otp.toString(), hashedOtp);
        if (isOTPValid) {
            const salt = await bcrypt.genSalt(14);
            const hashpassword = await bcrypt.hash(password, salt)
            const newUser = await User.create({
                email,
                password: hashpassword
            });
            res.status(201);
            res.json({
                status: "success",
                message: "User Created!"
            })
        }
        else {
            res.status(401);
            res.json({
                statusbar: "fail",
                message: "Incorrect OTP!"
            })
        }
        // const userInfo=req.body;
        // const salt=await bcrypt.genSalt(14);
        // const hashpassword=await bcrypt.hash(userInfo.password,salt)
        // userInfo.password=hashpassword;
        // const newUser= await User.create(userInfo);

        // res.status(201);
        // res.json({
        //     status: "success",
        //     data: {
        //         user: newUser,
        //     }
        // })
    }
    catch (err) {
        console.log(err.name);
        console.log(err.message);
        if (err.name == "ValidationError") {
            res.status(400);
            res.json({
                status: "fail",
                message: 'Data validation failed' + err.message,
            })
        }
        else {
            res.status(500);
            res.json({
                status: "fail",
                message: 'Internal Server Error',
            })
        }
    }
});
app.post("/api/v1/otps", async (req, res) => {
    try {

        const { email } = req.body;
        //email is required
        if (email && email.length > 0) {
            //otp is not sent on this email at least in last x=3 minutes 
            const otp = Math.floor(Math.random() * 9000 + 1000);
            const isEmailSent = await sendEmail(email, otp);
            if (isEmailSent) {
                const hashedotp = await bcrypt.hash(otp.toString(), 14);
                await OTP.create({ email, otp: hashedotp });
                res.status(201).json({ status: "success", message: 'otp sent to email' })
            }
            else {
                res.status(500).json({ status: "success", message: 'unable to send the otp' })
            }
        }
        else {
            res.status(400).json({ status: "fail", message: "Email is required!" })
        }

    }
    catch (err) {
        console.log(err.name);
        if (err.name == "ValidationError") {
            res.status(400);
            res.json({
                status: "fail",
                message: 'Data validation failed' + err.message,
            })
        }
        else {
            res.status(500);
            res.json({
                status: "fail",
                message: 'Internal Server Error',
            })
        }
    }
})
app.post("/api/v1/login",async(req,res)=>{
    try{
      const {email:newEmail,password:plainPassword}=req.body;
      const currentUser=await User.findOne({email: newEmail});
      if(currentUser)
      {
        const {_id,name,password: hashedPassword}=currentUser;
        const isPasswordCorrect=await bcrypt.compare(plainPassword,hashedPassword);
        if(isPasswordCorrect){
            const token=jwt.sign({newEmail,
                name,
                _id
            },"this_is_a_very_long_secret_key_abcd_123",
            {expiresIn: "15m"});
            res.cookie("authorization",token,
                {
                    httpOnly: true,
                }
            );
            res.status(200);
            res.json({
                status: "success"
            })
        }
        else{
            res.status(401);
        res.json({
            status: "fail",
            message:"Email or password is incorrect"
        })
        }

      }
      else{
        res.status(400);
        res.json({
            status: "fail",
            message: "User is not Registered!"
        })
      }

    }
    catch(err){
     console.log(err.name);
     console.log(err.code);
     console.log(err.message);
     res.status(500);
    }
})
app.use(cookieParser());
app.use((req,res,next)=>{
    // console.log(req.cookies);
    const {authorization}=req.cookies;
    jwt.verify(authorization,"this_is_a_very_long_secret_key_abcd_123",(err,data)=>{
        if(err){
            res.status(401);
            res.json({
                status: "fail",
                message: "unauthorized",
            })
            return;
        }
    //    req.userInfo=data;  
    })
    next();
})
app.get("/api/v1/isLoggedIn",(req,res)=>{
    res.status(200);
    res.json({
        status: "success",
        data: req.userInfo
    })
})
app.post('/api/v1/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const doc = await Product.create(newProduct);
        res.status(201);
        res.json({
            status: "success",
            data: doc,
        })
    }
    catch (err) {
        console.log(err.name);
        if (err.name == "ValidationError") {
            res.status(400);
            res.json({
                status: "fail",
                message: 'Data validation failed',
            })
        }
        else {
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
app.listen(1502, () => {
    console.log("server is running on port 1502");

})