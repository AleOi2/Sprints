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
    })
}   

module.exports = artigosController;
