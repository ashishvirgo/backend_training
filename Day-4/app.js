const exp = require("express")
const fspromises = require("fs/promises");
const { myReadFile, myWriteFile, createNewId } = require("./utils");
const app = exp();
app.use(exp.json());
app.get('/', async (req, res) => {
    try {
        const arr = await myReadFile();
        res.status(200);
        res.json({
            status: "success",
            data: arr,
        })
    }
    catch (err) {
        console.log('get products Error', err.message)
        res.status(500);
        res.json({
            status: "failed",
        })
    }
})
// app.post('/products',async(req,res)=>{
//     const newProduct=req.body;
//     const data=[newProduct];
//     await fspromises.writeFile("./db.json",JSON.stringify(data));
//     res.json({
//         status: "success",
//     })
//   })
app.post('/prods', async (req, res) => {
    try {
        const newProduct = req.body;
        const arr = await myReadFile();
        //createNewId
        const newId = createNewId(arr);
        newProduct.id = newId;
        arr.push(newProduct);
        await myWriteFile(arr);
        res.status(201);
        res.json({ status: "success" });
    }
    catch (err) {
        console.log("Post Prods Error ", err.message);
        res.status(500);
        res.json({ status: "failed" });
    }
});
app.patch("/prods/:id", async (req, res) => {
    try {
        const reqid = req.params.id;
        const newProductInfo = req.body;
        const arr = await myReadFile();
        let foundindex = arr.findIndex((obj) => {
            if (obj.id == reqid) return true;
            return false;
        });
        if (foundindex != -1) {
            const oldProduct = arr[foundindex];
            const newProduct = { ...oldProduct, ...newProductInfo };
            arr[foundindex] = newProduct;
            await myWriteFile(arr);
            res.status(200);
            res.json({
                status: "success",
                index: foundindex,
            });
        }
        else {
            res.status(400);
            res.json({
                status: "fail",
                message: "invalid id",
            });
        }

    }
    catch (err) {
        console.log("patch prods id error", err.message);
        res.status(500);
        res.json({
            status: "failed"
        });
    }
});
app.delete("/products/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const arr = await myReadFile();
        const foundIndex = arr.findIndex((ele) => {
            return ele.id == productId;
        });
        if (foundIndex !== -1) {
            arr.splice(foundIndex, 1);
            await myWriteFile(arr);
            res.status(204);
            res.json({
                status: "success",
                message: "Delete data successfully",
            });
        }
        else {
            res.status(400);
            res.json({
                status: "fail",
                message: "invalid id",
            });
        }
    }
    catch (err) {
        console.log('delete products error', err.message);
        res.status(500);
        res.json({
            status: "fail",
        });
    }
})

app.listen(1400, () => {
    console.log("-------server started-----------");
})