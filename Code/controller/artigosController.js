let { 
    dummy, 
    cards, 
    numDisplay 
} = require("../model/artigosModel");
const { Article } = require("../Sequelize/model/");

const { url } = require('../constants/constants');
const limit = 8;
const offset = 0; 
numDisplay = 7

Article.findAll({
    raw:true,
    limit,
    offset,
    where: {}, 
  })
  .then(data => {

      dummy = {
          id:data[0].id,        
          type: "main",
          name:data[0].imageHighlight,
          title:data[0].titleArticle,
          label:data[0].textArticle.substring(1,data[0].textArticle.indexOf("."))+"...",
          ref: "/artigos/"+data[0].id,
      };  

      cards = [];
      for(let idx=1;idx<7;idx++){
          cards.push(
            {
              id:data[idx].id,        
              type: "card",
              name:data[idx].imageHighlight,
              title:data[idx].titleArticle,
              label:data[0].textArticle.substring(1,data[0].textArticle.indexOf("."))+"...",
              ref: "/artigos/"+data[idx].id,
            });
      };
    });


         

 


const artigosController = (req, res) =>{
    // console.log("cards *******************************", cards); // debug
    res.render('Artigos/artigos', {
        dummy:dummy,  
        cards:cards,
        numDisplay:numDisplay,
        url: url,
    })
}   

module.exports = artigosController;
