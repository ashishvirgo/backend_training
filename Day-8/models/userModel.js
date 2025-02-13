const mongoose =require('mongoose');
const userSchema=new mongoose.Schema({
    name: {
        type: String,
         },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
         },
    password: {
        type: String,
        min: 8,
        required: true
         }
},
{
    timestamps: true,
  }
);

const User=mongoose.model("users",userSchema);
module.exports=User;