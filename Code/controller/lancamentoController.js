const categorias =[["educacao.png", "emprestimo.png", "lazer.png", "mercado.png", "moradia.png", "restaurante.png", "saude.png", "servicos.png", "transporte.png", "vestuario.png", "viagens.png", "other.png"],  ["salario.png", "emprestimo.png", "other.png"] ];

const lancamentoController = function(req, res){
    res.render('lancamento/lancamento',{ 'categorias' : categorias });
}

module.exports = lancamentoController;