var express = require('express');
var router = express.Router();
var { Login } = require('../controller/login')
const artigoRoute = require('./artigos/artigoRoute')


router.get('/login', Login);

router.use('/artigos', artigoRoute)

router.get('/', function (req, res){
    res.send('Server is running...');
})

module.exports = {
    router
};
