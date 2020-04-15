var express = require('express');
var router = express.Router();
var { Login } = require('../controller/login')
const artigoRoute = require('./artigos/artigoRoute')
const homeRoute = require('./home/homeRoute')
<<<<<<< HEAD
const lancamentoRoute = require('./lancamento/lancamentoRoute')
=======
const userRoute = require('./usuarios/usuarioRoute')

>>>>>>> bf4ff4258afb56caa0c40761403f33e4c91fc90c

router.get('/login', Login);

router.use('/artigos', artigoRoute)

router.get('/lancamento', lancamentoRoute);

router.use('/', homeRoute);


router.get('/', function (req, res){
    res.send('Server is running...');
})

router.use('/usuarios', userRoute);

module.exports = {
    router
};
