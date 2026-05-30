const express = require('express');
const router=express.Router();
const authController = require('../controllers/auth.controllers');
const authMiddleWare = require('../middlewares/auth.middleware')


router.post('/signup',authController.signUp);
router.post('/login',authController.login);
router.get('/founduser',authMiddleWare,authController.foundUser);

module.exports = router;