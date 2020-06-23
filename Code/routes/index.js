var express = require('express');
var router = express.Router();
const artigoRoute = require('./artigos/artigoRoute')
const sobrenosRoute = require('./sobrenos/sobrenosRoute')
const homeRoute = require('./home/homeRoute')
const lancamentoRoute = require('./lancamento/lancamentoRoute')
const userRoute = require('./usuarios/usuarioRoute')
const dashboradRoute = require('./dashboard/dashboardRoute')
const profileRoute = require('./profile/profiledRoute')
const authorization = require('../middleware/authorization')

router.use('/artigos', artigoRoute);
router.use('/sobrenos', sobrenosRoute)
router.use('/usuarios', userRoute);
router.use('/lancamento', authorization.authenticated, lancamentoRoute);
router.use('/dashboard',  authorization.authenticated, dashboradRoute);
router.use('/perfil',  authorization.authenticated, profileRoute);
router.use('/', homeRoute);

router.get('*', function(req, res) {
    res.redirect('/');
});

module.exports = {
    router
};
