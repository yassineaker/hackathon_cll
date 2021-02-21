const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');

const UserModel = require('../models/User.js');

const login = express.Router();

login.use(bodyParser.json());

login.route('/')

.post((req, res, next) => {
  let fetchedUser;
  UserModel.findOne({
    email: req.body.email
  }).then(user => {
    console.log(req.body.password, user)
    if(!user) {
      return res.status(401).json({
        message: "Auth failed"
      });
    } 
    fetchedUser = user; 
    
    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: "Auth failed"
      });
    }
    const token = jwt.sign(
      {email: fetchedUser.email , userId: fetchedUser._id, userfName: fetchedUser.firstname, userlName: fetchedUser.lastname},
      'secret_should_be_longuer',
      {expiresIn: "1h"}
    );
    res.status(200).json({
      token: token,
      expiresIn: 3600,
      userId: fetchedUser._id,
      userfName: fetchedUser.firstname,
      userlName: fetchedUser.lastname

    });
  })
  .catch(err => {
    console.log(err);
    return res.status(401).json({
      message: "Auth failed"
    });
  });
})


module.exports = login;
