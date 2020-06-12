
const homeController = function(req, res){
<<<<<<< HEAD
    res.render('home/home',
    {
        token: req.cookies.token, 
        user: req.cookies.user
    });
=======
    console.log('teste')
    res.render('home/home');

>>>>>>> 41d7e24e80b4369c709a97cde685afd817225573
}

module.exports = homeController;