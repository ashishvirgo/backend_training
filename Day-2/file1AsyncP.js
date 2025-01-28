const fsPromises=require("fs/promises");
// const myreadFile=()=>{
//     const res=fsPromises.readFile('./dummy1.txt','utf-8');
//     res.then((data)=>{
//         console.log(data);
//     }).catch((err)=>{
//         console.log("Error .....!!!")
//     });
// };
// myreadFile();

const myreadFile=async()=>{
    try{
        const res=await fsPromises.readFile('./dummy.txt','utf-8');
        console.log(res);
    }
    catch(err){
        console.log('Error....'+err);
    }
    
};
console.log('Start');
myreadFile();
console.log('middle');
myreadFile();
console.log('End');
