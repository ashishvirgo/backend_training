const fs=require('node:fs');
const cb=(err,data)=>{
    if(err)
        console.log('error .....file')
    else
    console.log(data);

}
function myReadFile(){
const data=fs.readFile('./dummy.txt','utf-8',cb);
// console.log(data);
}
module.exports=myReadFile;
