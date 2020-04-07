const { dummy, cards } = require("../model/artigosModel");

const artigosController = (req, res) =>{
    console.log(dummy)
    res.render('Artigos/artigos', {dummy:dummy, cards:cards})
}   

module.exports = artigosController;
