// let { 
//     dummy, 
//     cards, 
//     numDisplay 
// } = require("../model/artigosModel");
const { Article } = require("../Sequelize/model/");

const { url } = require('../constants/constants');

numDisplay = 7


const artigosController = {
    
    list: async (req, res) =>{

        let page  = req.params.id;
        let { count:total, rows:data } = await Article.findAndCountAll({
            raw:true,
            limit: 7,
            offset: (page - 1) * 7,
        });  
        let totalPages = Math.ceil(total/7);
        //console.log("********** parametros", req.params.id, " - pagina ", page); //debug

        //console.log("saida consulta findandcount ******** totalpag",totalPages, "artigos", data); //debug
        res.render('Artigos/artigos', {
            data: data,
            numDisplay:numDisplay,
            totalPages,
            url: url,
        })
    },
    view: async (req, res) =>{
        let articleView  = req.params.id;
        console.log(articleView);
        article = await Article.findOne({
            where: {
                id: articleView,
            }});
        res.render('Artigos/artigosView', { article });
    }
}

module.exports = artigosController;
