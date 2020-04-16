const express = require('express')
const router = express.Router();
const lancamentoController = require('../../controller/lancamentoController')

router.get('/', lancamentoController);

module.exports = router;