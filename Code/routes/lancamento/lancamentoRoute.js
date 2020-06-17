const express = require('express')
const router = express.Router();
const lancamentoController = require('../../controller/lancamentoController')
const authorization = require('../../middleware/authorization')

router.get('/listar', lancamentoController.index);
router.post('/insert', lancamentoController.insert);
router.get('/', lancamentoController.add);
router.get('/editar', lancamentoController.edit);
router.put('/:id/editar', lancamentoController.edit);
router.delete('/:id/deletar', lancamentoController.delete);


module.exports = router;