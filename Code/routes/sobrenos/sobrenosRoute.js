const express = require('express')
const router = express.Router();
const sobrenosController = require('../../controller/sobrenosController')

router.get('/', sobrenosController);

module.exports = router;