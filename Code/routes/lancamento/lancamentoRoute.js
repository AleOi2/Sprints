const express = require('express')
const router = express.Router();
const lancamentoController = require('../../controller/lancamentoController')

router.get('/listar', lancamentoController.list);
router.get('/', lancamentoController.add);

module.exports = router;