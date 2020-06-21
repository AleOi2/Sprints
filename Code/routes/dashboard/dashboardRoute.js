const express = require('express')
const router = express.Router();
const dashboardController = require('../../controller/dashboradController')

router.get('/', dashboardController);

module.exports = router;