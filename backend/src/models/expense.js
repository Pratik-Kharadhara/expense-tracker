const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    userID:{type: mongoose.Schema.Types.ObjectId ,ref:'User',required :true},
    icon:{
        type:String,
        required:true
    },
    source:{
        type:String ,required:true
    },
    amount :{type:Number ,required:true},
    date:{
        type:Date,
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('expense',expenseSchema);