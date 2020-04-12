const { 
    dummy, 
    cards, 
    numDisplay 
} = require("../model/artigosModel");
const { url } = require('../constants/constants');

const artigosController = (req, res) =>{
    console.log(dummy)
    console.log(req.params)
    res.render('Artigos/artigos', {
        dummy:dummy, 
        cards:cards,
        numDisplay:numDisplay,
        url: url
    })
}   

module.exports = artigosController;
