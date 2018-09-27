const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

router.get('/data', verifyToken, (req, res) => {
  const data = jwt.decode(req.token, 'sa9@1KkZtY!');

  if(!data) return res.sendStatus(403);

  const id = data.id;

  User.findOne({ id }, (err, user) => {
    if(user) {
      res.json({
        id: user.id,
        username: user.username,
        img: user.img,
        email: user.email
      });
    }
  })

})

function verifyToken(req, res, next) {
  if(typeof req.headers['authorization'] !== 'undefined') {
    req.token = req.headers['authorization'].split(' ')[1];
    next();
  } else {
    res.sendStatus(403);
  }

}

module.exports = router;
