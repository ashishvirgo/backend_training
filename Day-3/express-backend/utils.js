const fspromises=require('fs/promises');

const myReadFile=async(loc)=>{
 try{
  const data=await fspromises.readFile(loc,'utf-8');
  const realdata=JSON.parse(data);  
  return realdata;
 }
 catch(err){
    console.log("error occured",err.message);
 }
};
const writeFile=async(loc,obj)=>{
  
}
module.exports={
    myReadFile,
};