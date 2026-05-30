const express = require('express');
const authRouter = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');

const app = express();

//middlewares
app.use(express.json());//to use the json sent by the req
app.use(cookieParser())


app.use('/api/auth',authRouter);


module.exports = app;