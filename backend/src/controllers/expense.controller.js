const expenseModel = require('../models/expense')

const addExpense = async (req,res)=>{
    const userId = req.user.id;
 try{
        const {icon , source , amount ,date} = req.body;

        if(!icon || !source || !amount || !date){
              res.status(400).json({
                     message:"all the field is required"
              })
        }

        const createExpense = await expenseModel.create({
              userID,
              icon,
              source,
              amount,
              date
        })
        await createExpense.save();
        res.status(201).json({
              message:"Expense added!",
              body:createExpense
        })
 }
 catch(e){
       res.status(401).json({
              message:"server run into error!",
              error:e
       })
 }
}

module.exports = {addExpense}
