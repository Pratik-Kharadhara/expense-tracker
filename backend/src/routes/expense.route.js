const express = require('express')
const router = express.Router();
const authMiddleWare = require('../middlewares/auth.middleware');
const expenseController = require('../controllers/expense.controller');

router.get('/addExpense',authMiddleWare,expenseController.addExpense);