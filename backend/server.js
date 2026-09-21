const app = require("./src/app");
require('dotenv').config();
const connectDB = require('./src/db/db');

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on ', process.env.PORT)
        })
    })
    .catch(() => {
        process.exitCode = 1;
    });