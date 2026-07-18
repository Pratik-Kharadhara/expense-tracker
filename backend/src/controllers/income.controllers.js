
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
        const income = (await incomeModel.find({userId})).sort({date:-1});
        res.json(income);
    }
    catch(e){
        res.status(500).json({
            message : "server error",
            error :e
        })
        }
}

module.exports = {addIncome , findAllIncome}