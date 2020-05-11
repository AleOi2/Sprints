const { sideBarInput } = require("../model/sideBarInput");
const dashboardController = (req, res) =>{
    console.log("Token de cookies")
    console.log(req.cookies.token)
    console.log("Token de cookies")
    console.log(req.cookies.user)
    res.render('dashboard/dashboard', { 
        sideElement:sideBarInput, 
        token: req.cookies.token, 
        user: req.cookies.user 
    })
}   

module.exports = dashboardController;
