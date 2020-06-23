const express = require('express')
const router = express.Router();
const artigosController = require('../../controller/artigosController')


router.get('/view/:id', artigosController.view);
router.get('/page:id',  artigosController.list);



module.exports = router;