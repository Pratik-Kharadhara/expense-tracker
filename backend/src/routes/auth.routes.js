const express = require('express');
const router=express.Router();
const authController = require('../controllers/auth.controllers');


router.use('/signup',authController.signUp);

module.exports = router;