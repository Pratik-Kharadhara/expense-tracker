const userModel = require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');



const signUp = async (req,res)=>{
    const {fullname , email,password , profileImageUrl} = req.body;
    //before checking we have check the token and 
    //check for if not recieved any details 
    if(!fullname || !email || !password){
        res.status(400).json({
            message:"All the fields required!!"
        })
    }

    //if the user already exists or not 
    const userExists = await userModel.findOne({
        $or:[
            {email},
            {fullname}
        ]
});

    if(userExists){
       return res.staus(409).json({
            message:"The User name /email is already exists";
        })
    }

    //hashed the password
    const hashPass = await bcrypt.hash(password,10);

    //create the user
    const user = userModel.create({
        fullname:fullname,
        email:email,
        password:hashPass,
        profileImageUrl
    })

    //creating token 
    const token= jwt.sign({
        id:user._id
    },process.env.JWT_SECRET)

    //saving and sending the token to the website
    res.cookie("token",token);

    res.status(201).json({
        message:"SignUp succesfully!",
        user:user
    })
}

module.exports = {signUp}