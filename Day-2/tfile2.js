const writedata=require('./tfile1')
const fs=require('node:fs');
writedata();
const data=fs.readFileSync('./dummy.txt','utf-8');
console.log(data);