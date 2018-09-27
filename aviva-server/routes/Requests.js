const _id = require('shortid');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Request = require('../models/Request');

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id;

    Request.findOne({ id }, (err, request) => {
      if(request) {
        res.json({ request });
      }
    });
  })

router.route('/')

  .get((req, res) => {
    Request.find({}, (err, requests) => {
      res.json({ requests });
    })
  })

  .post((req, res) => {

    const requestData = {
      id: _id.generate(),
      title: req.body.title,
      text: req.body.text,
      img: req.body.img,
      senderId: req.body.senderId
    }

    const request = new Request(requestData);

    request.save((err) => {
      if(err) return res.json({ database: "Erro ao tentar salvar seu pedido no nosso banco de dados." })
      else return res.json({ status: 'success', message: 'Dados do pedido salvos com sucesso' })
    });

  })

  .delete((req, res) => {
    Request.findByIdAndRemove(req.body.id, (err, request) => {

      if(err) return res.sendStatus(403);

      const response = {
        message: "Pedido deletado com sucesso",
        id: request.id
      }

      return res.json(response);

    })
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
