const fs =require('fs');
const path = require('path');
const db = path.join('usuario.json');

function listarUsuario(){
    let listaUsuario = fs.readFileSync(db, {encoding: 'utf-8'});
    
    listaUsuario = JSON.parse(listaUsuario);
    return listaUsuario;
}

function cadastrarUsuario(nome, email, senha){
    let listaUsuario = fs.readFileSync(db);
    
    listaUsuario = JSON.parse(listaUsuario);
    listaUsuario.push({nome,email,senha});
    
    return fs.writeFileSync(db, JSON.stringify(listaUsuario));


}

function deletarUsuario(posicaoUsuario){

    let listaUsuario = fs.readFileSync(db);
    
    listaUsuario = JSON.parse(listaUsuario);
    listaUsuario.splice(posicaoUsuario,1);
    
    return fs.writeFileSync(db, JSON.stringify(listaUsuario));

}

function buscarUsuario(email){
    let listaUsuario = fs.readFileSync(db);
    listaUsuario = JSON.parse(listaUsuario);

    let [usuario] = listaUsuario.filter((usuario, index)=>{
        return usuario.email == email;
    });
    return usuario;
}


module.exports = {listarUsuario, cadastrarUsuario, deletarUsuario, buscarUsuario}