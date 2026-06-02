const express = require('express');
const authRouter = require('./routes/auth.routes');
const incomeRouter = require('./routes/income.routes')
const cookieParser = require('cookie-parser');
const path = require('path')

const app = express();

//middlewares
app.use(express.json());//to use the json sent by the req
app.use(cookieParser())


app.use('/api/auth',authRouter);
app.use('/api/income',incomeRouter);

//serve the image url
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


module.exports = app;