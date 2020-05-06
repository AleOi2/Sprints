const Usuario = require('../model/Usuario');
const { User } = require('../Sequelize/model/');
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
        User.findAll().then((result) => {
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
            if(errors.length > 0 ){
                // res.status(400).send({err: "Validatiion result"})
                errors = parsedErrors(errors);
                res.render('usuarios/cadastroUsuario',{
                    err: errors, 
                    fields:{name, surname, email, password}
                })
            }

            let now = new Date();
            await User.create({
                name,
                surname,
                email,
                password: bcrypt.hashSync(password, 10),
                createdAt: now,
            }).catch((err) =>{
                res.render('usuarios/cadastroUsuario',{
                    err: {name: [{msg: 'Usuário já possui uma conta'}]}, 
                    fields:{name, surname, email, password}
                })

            })

            const user = await User.findAll({
                where: {
                    email
                }
            })
            
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
            }

            res.cookie('token', token, {maxAge: 24 * 1000 * 60 * 60});
            res.cookie('user', filterredValues, {maxAge: 24 * 1000 * 60 * 60});
            return res.redirect('/dashboard');
        } catch (err) {
            return res.render('usuarios/cadastroUsuario');
        }
    },

    deletarUsuario: (req, res) => {
        try {
            let {
                email,
            } = req.body;
            User.destroy({
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

            User.update({
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
            const user = await User.findAll({
                where: {
                    email
                }
            });

            if (user.length === 0) {
                return res.render('usuarios/login', { error: 'User or Password not found' });
            }

            let userValues = user[0].dataValues;
            await bcrypt.compare(password, userValues.password, (err, data) => {
                //if error than throw error
                if (err) {
                    return res.render('usuarios/login', { error: 'User or Password not found' });
                }
                //if both match than you can do anything
                if (!data) {
                    return res.render('usuarios/login', { error: 'User or Password not found' });
                } else {
                    const token = jwt.sign(
                        { id: userValues.id },
                        secret,
                        { expiresIn: 24 * 1000 * 60 * 60 }
                    )
                    let filterredValues = {
                        name: userValues.name,
                        email: userValues.email,
                    }

                    res.cookie('token', token, {maxAge: 24 * 1000 * 60 * 60});
                    res.cookie('user', filterredValues, {maxAge: 24 * 1000 * 60 * 60});
                    console.log('Entrei aqui')
                    return res.redirect('/dashboard');
                }
            })
        } catch (error) {
            return res.render('usuarios/login', { error: 'Cannot connect to server' });

        }
    },

}


module.exports = usuarioController