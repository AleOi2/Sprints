var express = require('express');
var router = express.Router();
var { Login } = require('../controller/login')

router.get('/login', Login);

router.get('/', function (req, res){
    res.send('Server is running...');
})

module.exports = {
    router
};
