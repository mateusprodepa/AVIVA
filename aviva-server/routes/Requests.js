const _id = require('shortid');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Request = require('../models/Request');
const User = require('../models/User');

router.route('/:id')

  .get((req, res) => {
    const id = req.params.id;

    Request.findOne({ id }, (err, request) => {
      if(request) {
        res.json({ request });
      }
    });
  })

  .delete((req, res) => {
    
    if(req.params.id) {
      const requestId = { id: req.params.id };

      Request.findOne(requestId, (err, request) => {

        if(err) return res.sendStatus(403);

        User.findOne({ id: request.sender.id }, (err, user) => {

          if(err) return res.sendStatus(403);

          user.requests = user.requests.filter(userRequest => userRequest.id != request.id);

          user.save(err => {
            if(err) return res.sendStatus(403);

            Request.deleteOne(requestId, (err, request) => {
              if(request.n === 1 && request.ok) {
                res.json({ status: 'success', message: 'Pedido deletado com sucesso' });
              } else {
                res.json({ status: 'error', message: 'Houve uma falha ao tentar apagar seu pedido' });
              }
            })

          })

        })

      })
    }

  })

router.route('/')

  .get((req, res) => {
    Request.find({}, (err, requests) => {
      res.json({ requests });
    })
  })

  .post((req, res) => {

    if(req.body.title) {
      const requestData = {
        id: _id.generate(),
        title: req.body.title,
        text: req.body.text,
        img: req.body.img,
        sender: {
          id: req.body.senderId,
          username: req.body.senderUsername
        },
        location: req.body.location
      }

      const request = new Request(requestData);

      request.save((err) => {
        if(err) {
          return res.json({ database: "Erro ao tentar salvar seu pedido no nosso banco de dados." });
        } else {

          const userId = { id: request.sender.id }

          User.findOne(userId, (err, user) => {
            if(err || !user) return res.json({ database: "Erro ao tentar salvar seu pedido no nosso banco de dados." });
            if(user) {
              user.requests = [ ...user.requests, request ];
              user.save(err => err ? console.log(err) : null);
              return res.json({ status: 'success', message: 'Dados do pedido salvos com sucesso' });
            }
          })
        }
      });

    }


  })

  .put((req, res) => {

  })


module.exports = router;

// {
// 	"username": "Knevari",
// 	"email": "mateus7319@gmail.com",
// 	"password": "administrador",
// 	"cpassword": "administrador"
// }
