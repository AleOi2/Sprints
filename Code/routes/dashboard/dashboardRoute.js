const express = require('express')
const router = express.Router();
const dashboardController = require('../../controller/dashboradController')
const dashboardModel = require('../../model/dashboardModel');
const { check } = require('express-validator');

router.post('/data', dashboardModel.getRevenueCostsData);
router.post('/category', dashboardModel.getAllCategory);
router.post('/prediction', dashboardModel.getPredictedCategory);
router.post('/editprediction', dashboardModel.editPredictedCategory);
router.get('/', dashboardController.pizzaGraph);

module.exports = router;