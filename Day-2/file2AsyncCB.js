const fs=require('node:fs');
const myReadFile=require('./file1AsyncCB.js');
myReadFile();
console.log("middle");
myReadFile();


