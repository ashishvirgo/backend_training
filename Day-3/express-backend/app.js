const express=require('express');
const {myReadFile}=require('./utils');
const app=express();
const port=3000;
app.get('/',async(req,res)=>{
    const data=await myReadFile("./data.json");
    console.log(data);
res.json(data);
})
app.listen(port,()=>{
console.log('server is running on port 3000');
});