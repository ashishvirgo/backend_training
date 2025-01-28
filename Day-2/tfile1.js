const fs=require('node:fs');
function writedata(){
fs.writeFileSync('./dummy.txt','hi Ashish how are u?')
}
module.exports=writedata;