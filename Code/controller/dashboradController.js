const { sideBarInput } = require("../model/sideBarInput");
const dashboardController = (req, res) =>{
    console.log("Token de cookies") //debug
    console.log(req.cookies.token) //debug
    console.log("Token de cookies") //debug
    console.log(req.cookies.user) //debug
    res.render('dashboard/dashboard', { 
        sideElement:sideBarInput, 
        token: req.cookies.token, 
        user: req.cookies.user 
    })
}   

module.exports = dashboardController;
