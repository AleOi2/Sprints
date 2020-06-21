const express = require('express')
const router = express.Router();
const dashboardController = require('../../controller/dashboradController')
const dashboardModel = require('../../model/dashboardModel')

router.post('/data', dashboardModel.getRevenueCostsData);
router.post('/category', dashboardModel.getAllCategory);
router.post('/prediction', dashboardModel.getPredictedCategory);
router.get('/', dashboardController.pizzaGraph);

module.exports = router;