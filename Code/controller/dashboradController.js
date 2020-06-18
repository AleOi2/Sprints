const { sideBarInput } = require("../model/sideBarInput");
const { url } = require("../constants/constants")
const { Release } = require("../Sequelize/model/Release");
const { safeAccess } = require("../utils/safeAcces");


const dashboardController = {
    pizzaGraph: (req, res) => {
        let saldo = (req.cookies.user.saldo !== null)?req.cookies.user.saldo:-1;
        console.log("saldo") 
        console.log(saldo) 
        res.render('dashboard/dashboard', {
            sideElement: sideBarInput,
            token: req.cookies.token,
            user: req.cookies.user,
            url: url,
            saldo:saldo
        })
    }
    ,
    colarUsusario: (req, res) => {


    }


}

module.exports = dashboardController;
