var express = require('express');
var router = express.Router();
var { Login } = require('../controller/login')
const artigoRoute = require('./artigos/artigoRoute')
const homeRoute = require('./home/homeRoute')
const lancamentoRoute = require('./lancamento/lancamentoRoute')

router.get('/login', Login);

router.use('/artigos', artigoRoute)

router.get('/lancamento', lancamentoRoute);

router.use('/', homeRoute);


router.get('/', function (req, res){
    res.send('Server is running...');
})

module.exports = {
    router
};
