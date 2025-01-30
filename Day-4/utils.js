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
  const createNewId=(arr)=>{
       const arrLength=arr.length;
       if(arrLength>0){
        const lastItem=arr[arrLength-1];
        const lastItemId=lastItem.id;
        return lastItemId+1;
       }
       return 1;
  }
  module.exports={
    myReadFile,
    myWriteFile,
    createNewId,
  }