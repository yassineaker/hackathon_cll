const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const transactionModel = require('../models/transaction');
const checkAuth = require('../middleware/check-auth');

const { all } = require('./login');

const transactions = express.Router();



transactions.route('/')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
}) 
.post(checkAuth, (req, res, next) => {
    const newTransc = new transactionModel({destSrc: req.body.destSrc,
                                montant:req.body.montant,
                                date:req.body.date,
                                type:req.body.type,
                                user:req.body.user,
                              });
    newTransc.save();
    res.json(newTransc);
  })

.get((req, res, next) => {
      transactionModel.find({}).populate('issuer').sort('_id').then((transactions) => {
          console.log(transactions);
          res.json(transactions)
      });
})


transactions.route('/:id')

.patch(async (req, res, next) => {
  const ts = await transactionModel.findById(req.params.id);
  Object.assign(ts, req.body);
  await ts.save();
  res.statusCode=201;
  res.json(ts);
})

.delete(checkAuth,(req, res, next) => {
  transactionModel.deleteOne({_id: req.params.id, issuer: req.userData.userId}).then(result => {
    if (result.n >0){
      res.status(200).json({ message: "Successfuly deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!!!" })    }
  }) 
})



module.exports= transactions ;
