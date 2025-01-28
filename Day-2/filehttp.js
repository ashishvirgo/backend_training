const http=require("node:http");
const server=http.createServer(async(req,res)=>{
    // console.log("request received");
    console.log("---->",req.url);
    const fetchres=await fetch("https://dummyjson.com/products");
    // console.log(fetchres);
    const data=await fetchres.json();
    const {products}=data;
    console.log("data=",data);
    res.setHeader('content-type','text/html')
    // console.log(Object.keys(req));
    // res.write("<h1 style='color: green'>hello</h1>");
    res.write(`<html>
        <style>
            body{
                padding: 2rem;
                background-color: yellow;
                display: flex;
                flex-direction: column;
                gap: 2rem;
            }

            div{
                width: 400px;
                background: lime;
                padding: 2rem;
            }
        </style>
<body>`);

products.forEach((elem) => {
res.write(`
<div>
    <h1>${elem.title}</h1>
    <p>${elem.description}</p>
    <img src="${elem.thumbnail}" height='200'>
</div>
`);
});

res.end(`</body></html>`);

});

server.listen(1100,()=>{
    console.log(`server running on port 1100`);
});
