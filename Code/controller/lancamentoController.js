const categorias =[["educacao.png", "emprestimo.png", "lazer.png", "mercado.png", "moradia.png", "restaurante.png", "saude.png", "servicos.png", "transporte.png", "vestuario.png", "viagens.png", "other.png"],  ["salario.png", "emprestimo.png", "other.png"] ];
const { sideBarInput } = require("../model/sideBarInput");
const { Category, Release }     = require("../Sequelize/model/");


const lancamentoController = {
    
    add:  (req, res) =>{

        res.render('lancamento/lancamento',{ 'categorias' : categorias, sideElement: sideBarInput });
   },

    list: (req, res) =>{
        res.render('lancamento/listarLancamento', {sideElement:sideBarInput});
    },

    insert: async (req, res) => {
        let { date, description, value } = req.body;
        let category_id = 1;
        let users_id = 1;
        console.log(" ===vars "+date+" "+description+" "+value);
        Release.create({
            date,
            value,
            description,
            value,      
            users_id,
            category_id,    
        });
        console.log("realizado");
        return res.redirect("/lancamento")
    }
}

module.exports = lancamentoController; 