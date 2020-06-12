const express = require('express')
const router = express.Router();
const lancamentoController = require('../../controller/lancamentoController')

router.get('/listar', lancamentoController.index);
router.post('/insert', lancamentoController.insert);
router.get('/', lancamentoController.add);
router.get('/editar', lancamentoController.edit);
router.post('/:id/editar', lancamentoController.edit);


module.exports = router;