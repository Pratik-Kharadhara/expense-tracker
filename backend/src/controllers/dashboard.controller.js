const Income = require('../models/Income');
const expense = require('../models/expense');
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
        
        //console.log("total income",{totalIncome,userId:mongoose.isValidObjectId(userId)});

        const totalExpense = await expense.aggregate([
            { $match :{userID:userObjectId}},
            { $group :{_id:null , total :{$sum:"$amount"}}}
        ])

        const last60daysIncomeTransaction = await Income.find({
            userId:userObjectId,
            date: {
                $gte : new Date(Date.now()- 60*24*60*60*1000)
            } ,

        }).sort({date:-1});


        //get total income for 60 days
        const last60daysIncome = last60daysIncomeTransaction.reduce(
            (sum,transaction) => sum+transaction.amount,
            0
        );

        //get last 30 days
        const last30daysTransaction =await expense.find({
            userID:userObjectId,
            date:{
                $gte : new Date(Date.now()-30*24*60*60*1000)
            }
        })

        const last30Expense = last30daysTransaction.reduce(
            (sum,transaction)=> sum+transaction.amount ,
            0
        )


        const lastTransaction = [
            ...(await Income.find({userId:userObjectId}).sort({date:-1}).limit(5)).map(
                (transaction)=>({
                    ...transaction.toObject(),
                    type:"Income",
            })),
            ...((await expense.find({userID:userObjectId}).sort({date:-1}).limit(5)).map(
                (transaction)=>({
                    ...transaction.toObject(),
                    type:"Expense",
                })
            )),
        ].sort((a,b)=> b.date - a.date);

        //response to frontend 
        res.json({ // ?. means optional chaining
            totalBalance : (totalIncome[0]?.total|| 0) - (totalExpense[0]?.total || 0),
            totalIncome : totalIncome[0]?.total || 0 ,
            totalExpense : totalExpense[0]?.total || 0 ,
            last60daysIncomeList :{
                total: last60daysIncome,
                transactions :  last60daysIncomeTransaction,
            },
            last30daysExpense : {
                total: last30Expense ,
                transactions : last30daysTransaction, 
            }  ,
            recentTransaction : lastTransaction ,
        })
    }
    catch(e){
        res.status(500).json({
            message : "Server Error!",
            error :e.message
        })
    }
}

module.exports = {getdashBoardData};