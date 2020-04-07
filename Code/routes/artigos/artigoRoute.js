const express = require('express')
const router = express.Router();
const artigosController = require('../../controller/artigosController')

router.get('/', artigosController);

module.exports = router;