
const { sideBarInput } = require("../model/sideBarInput");
const { url } = require('../constants/constants')

const homeController = function(req, res){
    if(!req.cookies.user){
        res.render('home/home',
        {
            token: req.cookies.token, 
            user: req.cookies.user
        });
    }else{
        res.render('dashboard/dashboard',
        {
            sideElement:sideBarInput, 
            token: req.cookies.token, 
            user: req.cookies.user,
            url: url

        });

        
    }
}

module.exports = homeController;