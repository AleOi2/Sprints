const express = require('express')
const router = express.Router();
const artigosController = require('../../controller/artigosController')
const { artigosMiddleware } = require('../../middleware/artigosMiddleware')

router.get('/view/:id', artigosMiddleware, artigosController.view);
router.get('/page:id', artigosMiddleware, artigosController.list);


module.exports = router;