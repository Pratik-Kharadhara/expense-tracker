const express = require("express");
const router = express.Router();
const authMiddle = require('../middlewares/auth.middleware');
const dashBoardData = require('../controllers/dashboard.controller');
router.get('/',authMiddle,dashBoardData.getdashBoardData);

module.exports  = router;