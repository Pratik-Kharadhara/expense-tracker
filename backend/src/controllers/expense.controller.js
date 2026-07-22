const xlsx = require('xlsx')
const expenseModel = require('../models/expense')

const addExpense = async (req,res)=>{
    const userID = req.user.id;
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

const findAllExpense = async(req,res)=>{
    const userID = req.user.id ;
   
    try{
        const expense = await expenseModel.find({userID}).sort({date:-1});
        res.json(expense);
    }
    catch(e){
        res.status(500).json({
            message : "server error",
            error :e
        })
        }
}




const deleteExpense = async(req,res)=>{
      const userID = req.user.id;
try{
            const expenseId = req.params.id
      await expenseModel.findByIdAndDelete(expenseId);
      res.status(201).json({
            message:"Expense deleted Succesfully!"
      })
}catch(e){
      res.status(500).json({
            message:"Server run into issue",
            error:{e}
      })
}
}


const excellExpense = async (req,res)=>{
      const userID = req.user.id
      try{
            const expense = (await expenseModel.find({userID})).sort({Date:-1})
            const data = expense.map((exp)=>{
                  Date:exp.date;
                  Amount:exp.amount;
                  Source:exp.source
                  
            })
        
      const wb = xlsx.utils.book_new();
      const ws = xlsx.utils.json_to_sheet(data);
      xlsx.utils.book_append_sheet(wb , ws ,"Expense");

      //write the file name
      xlsx.writeFile(wb,"expense_details.xlsx");

      //respond as excell
      res.download("expense_details.xlsx");

      }
      catch(e){
            res.status(500).json({
                  message:"An error occured in server"
            })
      }

}
module.exports = {addExpense ,deleteExpense ,findAllExpense ,excellExpense}
