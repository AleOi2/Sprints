const express = require('express')
const router = express.Router();
const dashboardController = require('../../controller/dashboradController')
const dashboardModel = require('../../model/dashboardModel');
const { check, body } = require('express-validator');
const { safeAccess } = require('../../utils/safeAcces');

router.post('/data', dashboardModel.getRevenueCostsData);
router.post('/category', dashboardModel.getCategoryCosts);
router.post('/prediction', dashboardModel.getPredictedCategory);
router.post('/editprediction', body('prediction').custom((value, { req }) => {
  console.log(req.body)
  console.log(req.body.prediction)
  console.log(safeAccess(req, ['body', 'prediction', 'valuePredict'], undefined))
  console.log(typeof(parseFloat(req.body.prediction.valuePredict)) === 'NaN')
    if (safeAccess(req, ['body', 'prediction', 'valuePredict'], undefined) && typeof(parseFloat(req.body.prediction.valuePredict)) !== 'NaN' ) {
      // Indicates the success of this synchronous custom validator
      return true;
    }  
    throw new Error('A entrada deve ser um número válido');
    }), dashboardModel.editPredictedCategory);
router.get('/', dashboardController.pizzaGraph);

module.exports = router;