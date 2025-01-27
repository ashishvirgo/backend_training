function sum(a,b){
    console.log('calculate Sum ....');
    return a+b;
}
function mul(a,b){
    console.log('calculate mul ....');
    return a*b;
}
const obj={
    username: "Ashish",
    add: sum,
    multiply: mul
}
 module.exports=obj;
