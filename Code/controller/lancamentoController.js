const categorias =[["educacao.png", "emprestimo.png", "lazer.png", "mercado.png", "moradia.png", "restaurante.png", "saude.png", "servicos.png", "transporte.png", "vestuario.png", "viagens.png", "other.png"],  ["salario.png", "emprestimo.png", "other.png"] ];
const { sideBarInput } = require("../model/sideBarInput");

const lancamentoController = {
    
    add: (req, res) =>{
        res.render('lancamento/lancamento',{ 'categorias' : categorias, sideElement: sideBarInput });
    },

    list: (req, res) =>{
        res.render('lancamento/listarLancamento', {sideElement:sideBarInput});
    }


}

module.exports = lancamentoController; 