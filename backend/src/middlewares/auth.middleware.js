const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const authMiddleWare=async (req,res,next)=>{
        const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : req.headers.authorization);

        if(!token){
            return res.status(401).json({
                message:"token not recieved"
            })
        }
    try{
        //decode the recieved token 
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        //saving the info we will get by the id of decod for the token
        //and sending it to the req.user
        req.user = await userModel.findById(decode.id).select('-password')

        if(!req.user){
            return res.status(401).json({
                message:"token user not found"
            })
        }

        next();

    }
    catch(err){
        res.status(401).json({
            message:"token not authorized"
        })
    }
}


module.exports = authMiddleWare;