const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required:true
    },
    email:{
        type:String ,
        required:true
        
    },
    password:{
        type:String ,
        required:true,
    },
    profileImageUrl:{
        type:String,
        default:null
    }
},{timestamps:true})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel ;