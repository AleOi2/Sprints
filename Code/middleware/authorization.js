const jwt = require('jsonwebtoken');
const { secret } = require('../constants/constants');
const { safeAccess } = require('../utils/safeAcces')
// check if token is valid
const authorization = {
    authenticated:(req, res, next) =>{
        const token = safeAccess(req, ['cookies', 'token'] ,undefined);
        if (!token) {
            return res.redirect('/home');
        }
        
        jwt.verify(token, secret , (err, decoded) => {
            if (err) {
                return res.redirect('/home');
            }
            req.id = decoded.id;
            return next();
        })

    }

}

module.exports = authorization