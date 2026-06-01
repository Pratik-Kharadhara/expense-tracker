const express = require('express');
const router=express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleWare = require('../middlewares/auth.middleware')
const upload = require("../middlewares/upload.middleware");

router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/founduser',authMiddleWare,authController.foundUser);

router.post('/upload-image',upload.single('image'),(req,res)=>{

        if(!req.file){
        return    res.status(400).json({
                message:"No file Uploaded"
            })
        }
        console.log(req.file)
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/
        ${req.file.filename}`

        res.status(201).json({
            message:"succesfulle updated the profile photo",
            url:imageUrl
        })
})

module.exports = router;