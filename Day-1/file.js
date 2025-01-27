const fs=require('node:fs');
let ans='Hello how are you?'
fs.writeFileSync('./output1.txt',ans);
ans +="\n I am Good!";
fs.writeFileSync('./output2.txt',ans);