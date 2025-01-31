const mongoose=require('mongoose');
const connectDB=async ()=>{
try{
    await mongoose.connect(`mongodb+srv://ashishvirgo12:admin@cluster0.tyj6h.mongodb.net/productDB?retryWrites=true&w=majority&appName=Cluster`);
    console.log("---DB Connected------");
}
catch(err){
    console.log("DB error",err.message);
}
};
connectDB();


