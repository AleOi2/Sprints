const express = require('express')
const usuarioController = require('../../controller/usuarioController');
const { check, body } = require('express-validator')
const route = express.Router();
const passport = require('passport');
const { secret } = require('../../constants/constants');
const jwt = require('jsonwebtoken');
const authorization = require('../../middleware/authorization')
require('../../passport');

const customValidator = passport.authenticate('custom', { failureRedirect: 'home/home', session: false });

route.get('/ver', customValidator, usuarioController.listarUsuario);
route.post('/delete', usuarioController.deletarUsuario);
route.post('/update', usuarioController.updateUsuario);

route.post('/cadastro', [
  check('email').exists().withMessage('E-mail é necessário'),
  check('name').exists().withMessage('Nome necessário'),
  check('surname').exists().withMessage('Sobrenome necessário'),
  check('password').exists().withMessage('Senha necessária'),
  check('checkerPassword').exists().withMessage('Confirmação de senha é necessário'),

  check('email').isEmail().withMessage('E-mail com formato inválido'),
  check('password').isLength({ min: 6 }).withMessage('Senha de pelo menos 6 caracteres'),
], usuarioController.criarUsuario);

route.get('/cadastro', usuarioController.viewFormCadastro);
route.get('/login', usuarioController.viewFormLogin);
route.post('/login', usuarioController.login);

route.get('/logout', usuarioController.logout);

route.get('/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email']
  }))

// GET /auth/google/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
route.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/home/home' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.session.passport },
      secret,
      { expiresIn: 86400 }
    )
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('user', req.user, { maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('/dashboard');
  });


  route.get('/auth/facebook',
  passport.authenticate('facebook', {
  }))

  route.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/home/home' }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.session.passport },
      secret,
      { expiresIn: 86400 }
    )
    res.cookie('token', token, { maxAge: 24 * 60 * 60 * 1000 });
    res.cookie('user', req.user, { maxAge: 24 * 60 * 60 * 1000 });
    res.redirect('/dashboard');
  });




module.exports = route;
