const artigosMiddleware = (req, res, next) =>{
    var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    return next();
}

module.exports = { artigosMiddleware }