const incomeModel = require('../models/Income');
const expense = require('../models/expense');
const expenseModel = require('../models/expense');
const mongoose = require('mongoose')
const getdashBoardData = async (req,res)=>{
    try{
        const userId = req.user.id;
        const userObjectId = new mongoose.Types.ObjectId(String(userId));

        //total income of the 
        const totalIncome = await Income.aggregate([
            { $match:{userId:userObjectId}},
            { $group : { _id : null ,total: {$sum : "$amount"}}},
        ]);
        
        console.log("total income",{totalIncome,userId:mongoose.isValidObjectId(userId)});

        const last60daysIncomeTransaction = await Income.find({
            userId ,
            date: {
                $gte : new Date(Date.now()- 60*24*60*60*1000)
            } ,

        }).sort({date:-1});


        //get total income for 60 days
        const last60daysIncome = await last60daysTransaction.reduce(
            (sum,transaction) => sum+transaction.amount,
            0
        );

        //get last 30 days 
        const last30daysTransaction =await expense.find({
            userId,
            date:{
                $gte : new Date(Date.now()-60*24*60*60*1000)
            }
        })

        const last30Expense = await last30daysTransaction.reduce(
            (sum,transaction)=> sum+transaction.amount ,
            0
        )
    }
    catch(e){

    }
}