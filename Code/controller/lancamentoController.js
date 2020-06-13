//const categorias =[["educacao.png", "emprestimo.png", "lazer.png", "mercado.png", "moradia.png", "restaurante.png", "saude.png", "servicos.png", "transporte.png", "vestuario.png", "viagens.png", "other.png"],  ["salario.png", "emprestimo.png", "other.png"] ];
const { sideBarInput } = require("../model/sideBarInput");
const { Category, Release } = require("../Sequelize/model/");
const { pickYearMonth }  = require("../utils/dateFormater");


const lancamentoController = {
    
    add:  async (req, res) =>{
        let categoriasDespesa = null;
        categoriasDespesa = await Category.findAll({attributes: ['id', 'category'] ,  where: {
            type: "D",
          },})

        let categorias3 = [];             
        categoriasDespesa.forEach((dados) => {categorias3.push([dados.id,dados.category])});
        // console.log(categorias3) //debug


        let categoriasReceita = null;
        categoriasReceita = await Category.findAll({attributes: ['id', 'category'] ,  where: {
            type: "R",
          },})

        let categorias4 = [];             
        categoriasReceita.forEach((dados) => {categorias4.push([dados.id,dados.category])});
        console.log(categorias4) //debug
        
        let categorias = [];
        categorias.push(categorias3,categorias4);  
        // console.log("******************************")
        // console.log(categorias[1])
        // console.log("******************************")
        // console.log(categorias[1][0][1])

        res.render('lancamento/lancamento',{ 
            'categorias' : categorias, 
            sideElement: sideBarInput,
            token: req.cookies.token, 
            user: req.cookies.user 
        });  
   },

    list: (req, res) =>{
        res.render('lancamento/listarLancamento', {sideElement:sideBarInput});
    },

    insert: async (req, res) => {
        let { categoryForm, date, description, value } = req.body;
        let category_id = categoryForm;
        let users_id = req.cookies.user.id;
        console.log(" ===vars "+date+" "+description+" "+value)  //debug
        console.log("id usuario lancto: "+users_id);             //debug
        console.log(typeof date)
        let month_year = pickYearMonth(date);
        Release.create({
            date,
            description,
            value,      
            users_id,
            category_id,
            month_year           
        });
        //console.log("realizado"); //debug
        return res.redirect("/lancamento",);
    }
}

module.exports = lancamentoController; 