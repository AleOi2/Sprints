var express = require('express');
var router = express.Router();
const artigoRoute = require('./artigos/artigoRoute')
const homeRoute = require('./home/homeRoute')
const lancamentoRoute = require('./lancamento/lancamentoRoute')
const userRoute = require('./usuarios/usuarioRoute')


router.use('/artigos', artigoRoute)
router.use('/lancamento', lancamentoRoute);
router.use('/usuarios', userRoute);
router.use('/', homeRoute);

module.exports = {
    router
};
