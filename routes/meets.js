const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const meetModel = require('../models/meet');
const checkAuth = require('../middleware/check-auth');

const { all } = require('./login');

const meets = express.Router();



meets.route('/')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
}) 
.post(checkAuth, (req, res, next) => {
    console.log(req.body.sujet );
    console.log(req.body.memberList);
    const newMeet = new meetModel({sujet: req.body.sujet,
                                dateDeb:req.body.dateDeb,
                                dateFin:req.body.dateFin,
                                memberList:req.body.memberList,
                                creator:req.body.creator,
                              });
    newMeet.save();
    res.json(newMeet);
  })

.get((req, res, next) => {
      meetModel.find({}).populate('creator').sort('_id').then((meets) => {
          console.log(meets);
          res.json(meets)
      });
})


meets.route('/:id')

.patch(async (req, res, next) => {
  const meeting = await meetModel.findById(req.params.id);
  Object.assign(meeting, req.body);
  await meeting.save();
  res.statusCode=201;
  res.json(meeting);
})

.delete(checkAuth,(req, res, next) => {
  meetModel.deleteOne({_id: req.params.id, creator: req.userData.userId}).then(result => {
    if (result.n >0){
      res.status(200).json({ message: "Successfuly deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!!!" })    }
  }) 
})



module.exports= meets ;
