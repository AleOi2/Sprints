//const categorias =[["educacao.png", "emprestimo.png", "lazer.png", "mercado.png", "moradia.png", "restaurante.png", "saude.png", "servicos.png", "transporte.png", "vestuario.png", "viagens.png", "other.png"],  ["salario.png", "emprestimo.png", "other.png"] ];
const { sideBarInput } = require("../model/sideBarInput");
const { pickYearMonth }  = require("../utils/dateFormater");
const { Category, Release, Users } = require("../Sequelize/model/");
const moment = require('moment')



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
        
        let categorias = [];
        categorias.push(categorias3,categorias4);  
        // console.log("******************************")
        // console.log(categoriaWs[1])
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
        let month_year = pickYearMonth(date);

        value = value.toString().replace(',','.');
        value = parseFloat(value);          

        console.log("Tentando criar")
        console.log(value)
        console.log(categoryForm)
        console.log(date)
        console.log(description)
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
    }, 

    index: async (req, res) => {

        //Função para obter o Id do usuário logado
        let userId = await Users.findOne({
            where: {
                email: req.cookies.user.email
            }            
        })
        userId = userId.id;

        //Função para obter todos os lançamentos do usuário
        let userReleases = await Release.findAll({
            where: {users_id: userId},
            order: [
                ['date','ASC']
            ]
        });
        
        if(userReleases.length > 0){
            //Função para obter o nome das categorias dos lançamentos
            let categoriesEdit = [];
            let categories = await Category.findAll();
            categories.forEach(category =>{
                categoriesEdit.push({id: category.id, name: category.category.replace('.png', ''), image: category.category})
            })
            res.render('lancamento/listarLancamento', {
                sideElement:sideBarInput,
                userReleases,
                categoriesEdit, 
                moment,
                user: req.cookies.user,
            });
        }else{
            res.render('lancamento/listarVazio',{
                sideElement:sideBarInput,
                user: req.cookies.user
            });
        }

             
    },

    edit: async (req, res)=>{

        let { id } = req.params; // id do lançamento que está sendo editado  
        let releaseEdit = req.body; // dados para serem alterados no banco ( value, date e description)

        releaseEdit.value = releaseEdit.value.toString().replace(',','.');
        releaseEdit.value = parseFloat(releaseEdit.value);  

        // Função para alteraros dados no banco
            await Release.update({
            value: releaseEdit.value,
            date: releaseEdit.date,
            description: releaseEdit.description,
        },{
            where: {
                id: id,
            }
        });

        return res.redirect("/lancamento/listar");    

    }, 

    delete: async (req, res)=>{
        let { id } = req.params; // id do lançamento a ser excluído

        await Release.destroy({
            where: { id: id }
        });
        return res.redirect("/lancamento/listar");       
    }
}

module.exports = lancamentoController; 