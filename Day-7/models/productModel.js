const mongoose =require('mongoose');
const productSchema=new mongoose.Schema({
    discount: Number,
    company: String,
    title:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        min:1,
        required: true,
    },
    quantity:{
      type: Number,
      default: 1,
      min: 0,
    },
    thumbnail: String,
},
  {
    timestamps: true,
  }
);
const Product=mongoose.model("products",productSchema);
module.exports=Product;