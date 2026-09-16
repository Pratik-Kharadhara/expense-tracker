const express = require('express');
const authRouter = require('./routes/auth.routes');
const incomeRouter = require('./routes/income.routes')
const expenseRouter = require('./routes/expense.route');
const dashbordRouter = require('./routes/dashboard.routes')
const cookieParser = require('cookie-parser');
const path = require('path')
const cors = require('cors');

const app = express();
//cors setup 
app.use(cors({
    origin: "http://localhost:5173"
}))
//middlewares
app.use(express.json());//to use the json sent by the req
app.use(cookieParser())


app.use('/api/auth',authRouter);
app.use('/api/income',incomeRouter);
app.use('/api/expense',expenseRouter);
app.use('/api/dashboard',dashbordRouter);


//serve the image url
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


module.exports = app;