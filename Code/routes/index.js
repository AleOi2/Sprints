var express = require('express');
var router = express.Router();
var { Login } = require('../controller/login')
const artigoRoute = require('./artigos/artigoRoute')
const homeRoute = require('./home/homeRoute')
const userRoute = require('./usuarios/usuarioRoute')


router.get('/login', Login);

router.use('/artigos', artigoRoute)

router.use('/', homeRoute);

router.get('/', function (req, res){
    res.send('Server is running...');
})

router.use('/usuarios', userRoute);

module.exports = {
    router
};
