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
    if (safeAccess(req, ['body', 'password', 'prediction', 'valuePredict'], undefined) && typeof(parseFloat(req.body.password.prediction.valuePredict)) === 'NaN' ) {
      throw new Error('A entrada deve ser um número válido');
    }  
    // Indicates the success of this synchronous custom validator
    return true;
  }), dashboardModel.editPredictedCategory);
router.get('/', dashboardController.pizzaGraph);

module.exports = router;