const { 
    dummy, 
    cards, 
    numDisplay 
} = require("../model/artigosModel");
const { url } = require('../constants/constants');

const artigosController = (req, res) =>{
    res.render('Artigos/artigos', {
        dummy:dummy, 
        cards:cards,
        numDisplay:numDisplay,
        url: url,
        token: req.cookies.token, 
        user: req.cookies.user,
    })
}   

module.exports = artigosController;
