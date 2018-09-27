const _id = require('shortid');
const jwt = require('jsonwebtoken');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator/check');
const { sanitize, matchedData } = require('express-validator/filter');

const salt = bcrypt.genSaltSync(10);

const router = express.Router();

const User = require('../models/User');

// const loginValidations = [
//   check('email')
//     .isLength({ min: 1 }).withMessage('Você não pode deixar seu email em branco.')
//     .custom(email => findUserByEmailAddress(email)
//       .then(found => found ? false : true )
//       .catch(err => console.warn(err))).withMessage('Não foi possível encontrar seu usuário'),
//
//   check('password')
//     .custom((password, { req, loc, path }) => checkPassword(req.body.email, password)
//       .then(matches => matches ? true : false )).withMessage('Suas credenciais parecem estar incorretas.')
// ]

const registerValidations = [
  check('username')
    .isLength({ min: 6, max: 25 }).withMessage('Seu nome de usuário deve conter entre 6 e 25 caracteres.')
    .custom(username => findUserByUsername(username)
      .then(found => found ? false : true )
      .catch(err => console.warn(err))).withMessage('Este nome de usuário já está em uso, tente novamente.'),

  check('email')
    .isLength({ min: 1 }).withMessage('Você não pode deixar seu email em branco.')
    .custom(email => findUserByEmailAddress(email)
      .then(found => found ? false : true )
      .catch(err => console.warn(err))).withMessage('Este endereço de e-mail já está sendo utilizado, por favor, tente novamente.'),

  check('password')
    .isLength({ min: 6 }).withMessage('Crie uma senha com mais de 6 caracteres, é pela sua própria segurança :)')
    .matches(/\d*/).withMessage('Sua senha deve conter no mínimo um número')
    .custom((password, { req, loc, path }) => password !== req.body.cpassword ? false : true ).withMessage('Suas senhas não conferem'),
]

router.post('/login', (req, res) => {

  // if(!errors.isEmpty()) {
  //   res.json({ status: 'error', message: errors.array() });
  // } else {

    User.findOne({ email: req.body.email })
      .exec((err, user) => {

        if(user) {

          const hashPassword = user.password;

          if(bcrypt.compareSync(req.body.password, hashPassword)) {
            const tokenData = { id: user.id, username: user.username }

            const token = jwt.sign(tokenData, 'sa9@1KkZtY!');

            return res.json({ status: 'success', message: 'Conta autenticada com sucesso', token })

          } else {
            res.json({
              status: 'error',
              message: [
                {
                  location: 'body',
                  param: 'password',
                  value: req.body.password,
                  msg: 'Suas credenciais parecem estar incorretas.'
                }
              ]
            })
          }

        } else {
          res.json({
            status: 'error',
            message: [
              {
                location: 'body',
                param: 'email',
                value: req.body.email,
                msg: 'Não foi possível encontrar seu usuário.'
              }
            ]
          })
        }

    })

  // }

});

router.post('/register', registerValidations, (req, res, next) => {

  const errors = validationResult(req);

  if(!errors.isEmpty()) {

    res.json({ status: 'error', message: errors.array() });

  } else {

    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const newUserData = {
      id: _id.generate(),
      username: req.body.username,
      email: req.body.email,
      password: hashPassword
    }

    const tokenData = { id: newUserData.id, username: newUserData.username }

    const token = jwt.sign(tokenData, 'sa9@1KkZtY!');

    const user = new User(newUserData);

    user.save((err) => {
      if(err) return res.json({ database: "Erro ao tentar salvar sua conta no nosso banco de dados." })
      else return res.json({ status: 'success', message: 'Dados de usuário salvos com sucesso', token })
    });

  }

});


function findUserByEmailAddress(email) {
  if(email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email })
        .exec((err, user) => {
          console.log(user);
          !user ? resolve(false) : resolve(true)
        })
    })
  }
}

function findUserByUsername(username) {
  if(username) {
    return new Promise((resolve, reject) => {
      User.findOne({ username })
        .exec((err, user) => {
          !user ? resolve(false) : resolve(true)
        })
    })
  }
}

function checkPassword(email, password) {
  return new Promise((resolve, reject) => {
    User.findOne({ email })
    .exec((err, user) => {
      if(user) {
        const hashPassword = user.password;
        if(bcrypt.compareSync(password, hashPassword)) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    })
  })
}

module.exports = router;
