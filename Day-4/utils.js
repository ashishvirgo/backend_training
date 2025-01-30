const fspromises=require('fs/promises');
const path="./db.json";
const myReadFile=async()=>{
  try{
    const text=await fspromises.readFile(path,"utf-8");
    const arr=JSON.parse(text);
    return arr;
  }
  catch(err){
    console.log("myReadFile error",err.message);
    return [];
  }
};

const myWriteFile=async(mydata)=>{
    try{
        const text=JSON.stringify(mydata);
      await fspromises.writeFile(path,text);
      return true;
    }
    catch(err){
      console.log("myWriteFile error",err.message);
      return false;
    }
  };
  module.exports={
    myReadFile,
    myWriteFile,
  }