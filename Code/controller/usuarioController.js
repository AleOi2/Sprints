const Usuario = require('../model/Usuario');
const { Users } = require('../Sequelize/model/');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const { secret } = require('../constants/constants')
const { validationResult } = require('express-validator')

// New error format:
const parsedErrors = (errors) =>  {
    let checkerPassword = [];
    let password = [];
    let name = [];
    let email = [];
    for(let error of errors){
        switch (error.param) {
            case 'checkerPassword':
                checkerPassword.push(error);
            break;
            case 'password':
                password.push(error);
            break;
            case 'name':
                name.push(error);                
            break;
            case 'email':
                email.push(error);                               
            break;
            default:
            break;
        }
    }
    return {checkerPassword, password, name, email}

}


let usuarioController = {
    listarUsuario: (req, res) => {
        let listaUsuario;
        Users.findAll().then((result) => {
            listaUsuario = result.map((element) => {
                return element.dataValues
            })

            res.render('usuarios/usuario', {
                usuario: listaUsuario,
                tituloDaPagina: "Será que da certo?"
            })
        })
    },

    viewFormCadastro: (req, res) => {
        res.render('usuarios/cadastroUsuario');
    },

    criarUsuario: async (req, res) => {
        try {
            let {
                name,
                surname,
                email,
                password,
            } = req.body;
            let errors = validationResult(req).errors; 
            console.log(errors)
            if(errors.length > 0 ){
                // res.status(400).send({err: "Validatiion result"})
                errors = parsedErrors(errors);
                console.log("Entrei1")
                res.render('usuarios/cadastroUsuario',{
                    err: errors, 
                    fields:{name, surname, email, password}
                })
            }else{
                console.log("Entrei2")
                let now = new Date();
                await Users.create({
                    name,
                    surname,
                    email,
                    password: bcrypt.hashSync(password, 10),
                    saldo: null
                }).catch((err) =>{
                    res.render('usuarios/cadastroUsuario',{
                        err: {name: [{msg: 'Usuário já possui uma conta'}]}, 
                        fields:{name, surname, email, password}
                    })
    
                })
                console.log("Entrando")
    
                const user = await Users.findAll({
                    where: {
                        email
                    }
                })
                console.log("Meu usuarios")
                console.log(user)
                
                let userValues = user[0].dataValues;
                console.log(userValues)
                const token = jwt.sign(
                    { id: userValues.id },
                    secret,
                    { expiresIn: 86400 }
                )
                let filterredValues = {
                    id: userValues.id,
                    name: userValues.name,
                    surname: userValues.surname,
                    email: userValues.email,
                    saldo:userValues.saldo
                }    
                res.cookie('token', token, {maxAge: 24 * 1000 * 60 * 60});
                res.cookie('user', filterredValues, {maxAge: 24 * 1000 * 60 * 60});
                return res.redirect('/dashboard');

            }

        } catch (err) {
            return res.render('usuarios/cadastroUsuario');
        }
    },

    deletarUsuario: (req, res) => {
        try {
            let {
                email,
            } = req.body;
            Users.destroy({
                where: {
                    email: email
                }
            })

            let msg = "Deleted " + email;
            return res.status(200).send({ msg: msg })
        } catch (error) {
            return res.status(500).send(new Error('Cannot delete element'));
        }
    },

    updateUsuario: (req, res) => {
        try {
            let {
                lastEmail,
                name,
                email,
                password
            } = req.body;

            Users.update({
                name,
                email,
                password: bcrypt.hashSync(password, 10)
            }, {
                where: {
                    email: lastEmail
                }
            })
            let msg = "Updated " + lastEmail;
            return res.status(200).send({ msg: msg })

        } catch (error) {
            return res.status(500).send(new Error('Cannot update element'));
        }
    },

    viewFormLogin: (req, res) => {
        res.render('usuarios/login');
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await Users.findAll({
                where: {
                    email
                }
            });

            if (user.length === 0) {
                return res.render('usuarios/login', { error: 'Usuário ou senha incorreta' });
            }

            let userValues = user[0].dataValues;
            await bcrypt.compare(password, userValues.password, (err, data) => {
                //if error than throw error
                if (err) {
                    return res.render('usuarios/login', { error: 'Usuário ou senha incorreta' });
                }
                //if both match than you can do anything
                if (!data) {
                    return res.render('usuarios/login', { error: 'Usuário ou senha incorreta' });
                } else {
                    const token = jwt.sign(
                        { id: userValues.id },
                        secret,
                        { expiresIn: 24 * 1000 * 60 * 60 }
                    )
                    let filterredValues = {
                        id: userValues.id,
                        name: userValues.name,
                        email: userValues.email,
                        surname: userValues.surname,
                        saldo:userValues.saldo
                    }
                    res.cookie('token', token, {maxAge: 24 * 1000 * 60 * 60});
                    res.cookie('user', filterredValues, {maxAge: 24 * 1000 * 60 * 60});
                    return res.redirect('/dashboard');
                }
            })
        } catch (error) {
            return res.render('usuarios/login', { error: 'Cannot connect to server' });

        }
    },

    logout:(req, res) =>{
        res.clearCookie('token');
        res.clearCookie('user');
        return res.redirect('/home/home');
    }

}


module.exports = usuarioController