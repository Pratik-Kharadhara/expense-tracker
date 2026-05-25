const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("THE DB IS CONNECTED")
    }
    catch(e){
        console.log(e);
        console.log("there is Error connecting to DB")
    }
}
module.exports = connectDB;