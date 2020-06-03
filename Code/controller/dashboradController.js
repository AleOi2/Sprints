const { sideBarInput } = require("../model/sideBarInput");
const { url } = require("../constants/constants")
const { Release } = require("../Sequelize/model/Release")


const dashboardController = {


    pizzaGraph: (req, res) => {

        res.render('dashboard/dashboard', {
            sideElement: sideBarInput,
            token: req.cookies.token,
            user: req.cookies.user,
            url: url
        })
    }
    ,
    colarUsusario: (req, res) => {


    }


}

module.exports = dashboardController;
