function autenticacao(req,res,next){
    let {usuarioLogado} = req.session;
    console.log(usuarioLogado);

    if(usuarioLogado != undefined && usuarioLogado != null){
        next();
    }

    return res.redirect('/usuarios/login');

    
}

module.exports = autenticacao