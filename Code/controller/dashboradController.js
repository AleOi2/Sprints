const { sideBarInput } = require("../model/sideBarInput");



const dashboardController = (req, res) =>{

    res.render('dashboard/dashboard', { 
        sideElement:sideBarInput, 
        token: req.cookies.token, 
        user: req.cookies.user, 
    })
}   

module.exports = dashboardController;
