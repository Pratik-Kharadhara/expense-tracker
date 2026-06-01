const userModel = require('../models/User');
const bcrypt=require('bcrypt');
const jwt = require('jsonwebtoken');



const signUp = async (req,res)=>{
    const {fullname ,email,password , profileImageUrl} = req.body;
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
       return res.status(409).json({
            message:"The User name or email is already exists"
        })
    }

    //hashed the password
    const hashPass = await bcrypt.hash(password,10);

   try{
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
        user:{
            id:user._id,
            fullname:(await user).fullname,
            email: (await user).email,
            password: (await user).password,
            profileImageUrl:(await user).profileImageUrl
        }
    })
   }
   catch(err){
   return res.status(409).send({
        message:"error while registering the user",
        error:err
    })
   }
}

const login = async (req,res)=>{
    //takes the input from the req.body
    const {email,password} = req.body;

    if(!email || !password){
        res.status(400).json({
            message:"Every Field is required"
        })
    }

    //find existing user
    const userExist = await userModel.findOne({email});

    if(!userExist){
        res.status(401).json({
            message:"user not found"
        })
    }

    //else we found the user

    try{
       //check the pass 
        const isPassCorrect =await bcrypt.compare(password,userExist.password);

    if(!isPassCorrect){
        console.log("i am reaching passincorrect")
        res.status(401).json({
            message:"password is not correct enter a valid one"
        })
    }
    //pass the token back to the server
    const token = await jwt.sign({
        id:userExist._id
    },process.env.JWT_SECRET)

    //save the token in cookie
    res.cookie("token",token);

    res.status(201).json({
        message:"user found and login succesfyully",
        user:{
            name:userExist.fullname,
            email: userExist.email
        }
    })
   }
catch(err){
    res.status(401).json({
        message:"error while Login",
        err
    })
}


}

const foundUser= async (req,res)=>{
   try{
    const foundUser = await userModel.findById(req.user.id).select('-password')

    if(!foundUser){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        message:"User Found!",
        user:foundUser});

   }
   catch(err){
    res.status(500).json({
        message:"error finding the user",
        error:err.message
    })
   }
    

}
module.exports = {signUp,login,foundUser} ; 