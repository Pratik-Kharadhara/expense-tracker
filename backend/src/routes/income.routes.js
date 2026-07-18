const express = require('express');

const router = express.Router();
const incomeController = require('../controllers/income.controllers');
const authMiddleWare = require('../middlewares/auth.middleware')


//creating all differenet expense method 
router.post('/addincome',authMiddleWare,incomeController.addIncome);
router.get('/findAllIncomes',authMiddleWare,incomeController.findAllIncome);
router.delete('/:id',authMiddleWare,incomeController.deleteIncome);
router.get('/excellDownload',authMiddleWare,incomeController.excellFile);

module.exports = router;