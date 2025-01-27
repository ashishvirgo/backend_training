const fs=require('node:fs');
const data1=fs.readFileSync('./dummy.txt','ascii');
console.log(data1);