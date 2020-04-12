const artigosMiddleware = (req, res, next) =>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log("Entrei no middleware")
    console.log(req.originalUrl)
    return next();
}

module.exports = { artigosMiddleware }