const mongoose = require('mongoose');
require('dotenv').config();

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000
        });
        console.log("THE DB IS CONNECTED")
    }
    catch(e){
        console.error("Database connection failed:", e.message)
        throw e;
    }
}
module.exports = connectDB;