const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware');
const expenseController = require('../controllers/expense.controller');

router.post('/addExpense',authMiddleWare,expenseController.addExpense);
router.get('/findAllExpense',authMiddleWare ,expenseController.findAllExpense);
router.delete('/deleteExpense/:id',authMiddleWare ,expenseController.deleteExpense);
router.get('/downloadExcell',authMiddleWare,expenseController.excellExpense);

module.exports = router;