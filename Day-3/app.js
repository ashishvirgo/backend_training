const http=require('http');
const fspromises=require('fs/promises');
const server=http.createServer(async(req,res)=>{
    const url=req.url;
    if(url=='/'){
        const data=await fspromises.readFile("./pages/homepage.html");
        res.end(data);
    }
    else if(url=='/about')
    {
        const data=await fspromises.readFile("./pages/about.html");
        res.end(data);
    }
    else{
        const data=await fspromises.readFile("./pages/error.html");
        res.end(data);
    }
});

server.listen(3000,()=>{
    console.log('server is running')
})

