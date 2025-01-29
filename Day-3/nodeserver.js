const http=require('http');
const server=http.createServer((req,res)=>{
    const url=req.url;
    if(url=='/')
        res.write('<html><body bgcolor=red><h1>Hello</h1></body></html>');
    else if(url=='/about')
        res.write('<html><body bgcolor=yellow><h1>Ashish Bajpai</h1></body></html>');
    else
        res.write('<h1>OOPS not found</h1>');
    res.end();

});

server.listen(3000,()=>{
    console.log('server is running')
})

