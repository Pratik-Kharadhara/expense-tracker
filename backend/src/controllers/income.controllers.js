const xlsx = require('xlsx');
const incomeModel = require('../models/Income');

const addIncome = async (req,res)=>{
        const userId = req.user.id;

        try{
            const { icon ,source,amount,date } = req.body ;

            if(!icon || !source || !amount || !date){
                res.status(400).json({
                    message:"ALL FIELDS REQUIRED"
                })
            }
            
            const createIncome = await incomeModel.create({
                userId,
                icon ,
                source ,
                amount ,
                date
            })
            await createIncome.save(); //saves the income
            res.status(200).json({
                message:"Income added succesfully",
                details:createIncome
            })
        }
        catch(err){
                res.status(500).json({
                    message:"SERVER SIDE ERROR!!",
                    err:err
                })
        }
}

const findAllIncome = async(req,res)=>{
    const userId = req.user.id ;
   
    try{
        const income = await incomeModel.find({userId}).sort({date:-1});
        res.json(income);
    }
    catch(e){
        res.status(500).json({
            message : "server error",
            error :e
        })
        }
}

const deleteIncome = async(req,res)=>{
    const userId = req.user.id;
    try{
      await incomeModel.findByIdAndDelete(req.params.id);
        res.json({
            message:"Income Deleted Succesfully!!"
        })
    }
    catch(e){
        req.status(500).json({
            message:"error occured in server",
            error:{e}
        })
    }
}

const excellFile = async(req,res)=>{
    const userId = req.user.id;

    try{
        const income = await incomeModel.find({userId}).sort({Date:-1});

        //prepare the data
        const data = income.map((item)=>({
            Source:item.source,
            Amount: item.amount,
            Date : item.date
        }))

        //prepare for excell
        const wb = xlsx.utils.book_new();//intiallzing work book
        const ws = xlsx.utils.json_to_sheet(data);//intiallzing the work sheet

        //append book to sheet
        xlsx.utils.book_append_sheet(wb,ws,"Income");

        //write the file name
        xlsx.writeFile(wb,"income_details.xlsx");

        res.download("income_details.xlsx");


    }
    catch(e){
        res.status(500).json({
            message:"Server Error"  
        })
    }

}

module.exports = {addIncome , findAllIncome ,deleteIncome ,excellFile}