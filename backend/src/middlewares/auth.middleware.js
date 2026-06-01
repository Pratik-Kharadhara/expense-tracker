const jwt = require('jsonwebtoken');
const userModel = require('../models/User');

const authMiddleWare=async (req,res,next)=>{
    //check if there is token or not
        const token = req.cookies.token;

        if(!token){ī
            res.status(401).json({
                message:"token not recieved"
            })
        }
    try{
        //decode the recieved token 
        const decode = jwt.verify(token,process.env.JWT_SECRET);

        //saving the info we will get by the id of decod for the token
        //and sending it to the req.user
        req.user = await userModel.findById(decode.id).select('-password')

        next();

    }
    catch(err){
        res.status(401).json({
            message:"token not authorized"
        })
    }
}


module.exports = authMiddleWare;