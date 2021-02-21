const express = require('express');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const UserModel = require('../models/User.js');

const register = express.Router();

register.use(bodyParser.json());

register.route('/')

.post((req, res, next) => {
  console.log(" test test "+req.body.firstname, req.params)
 bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const newUser = new UserModel({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash,
        
      });

      newUser.save().then(result => {
        res.status(201).json({
          message: 'New user Created!',
          result: result
        });
      })
      .catch(err => {
        res.status(500).json({
          error: err
        });
      })
    })

  });





module.exports = register;
