
const homeController = function(req, res){
    res.render('home/home',
    {
        token: req.cookies.token, 
        user: req.cookies.user
    });
}

module.exports = homeController;