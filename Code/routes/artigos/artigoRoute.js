const express = require('express')
const router = express.Router();
const artigosController = require('../../controller/artigosController')
const { artigosMiddleware } = require('../../middleware/artigosMiddleware')

router.get('/page:id', artigosMiddleware, artigosController);

module.exports = router;