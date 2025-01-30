const exp=require("express")
const fspromises=require("fs/promises");
const {myReadFile,myWriteFile}=require("./utils");
const app=exp();
app.use(exp.json());
app.get('/',async(req,res)=>{
    try{
        const arr=await myReadFile();
        res.json({
            status: "success",
            data: arr,
        })
    }
    catch(err){
        console.log('get products Error',err.message)
        res.json({
            status: "failed",
        })
    }
})
app.post('/products',async(req,res)=>{
    const newProduct=req.body;
    const data=[newProduct];
    await fspromises.writeFile("./db.json",JSON.stringify(data));
    res.json({
        status: "success",
    })
  })
  app.post('/prods',async(req,res)=>{
    try{
         const arr=await myReadFile();
         arr.push(req.body);
         await myWriteFile(arr);
         res.json({status: "success"});
    }
    catch(err){
        console.log("Post Prods Error ",err.message);
        res.json({status: "failed"});
    }
    
  })
app.listen(1400,()=>{
    console.log("-------server started-----------");
})