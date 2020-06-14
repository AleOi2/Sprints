const { sideBarInput } = require("../model/sideBarInput");
const { url } = require("../constants/constants")

const profileController = (req, res) =>{
    console.log("Profile");
    console.log(req.cookies)

    res.render('perfil/perfil',
    {
        sideElement:sideBarInput, 
        token: req.cookies.token, 
        user: req.cookies.user,
        url: url,
    });

}


module.exports = profileController;