const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const materialModel = require('../models/Material');
const checkAuth = require('../middleware/check-auth');

const { all } = require('./login');

const materials = express.Router();



materials.route('/')

.all((req,res,next) => {
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next();
}) 
.post(checkAuth, (req, res, next) => {
    console.log(req.body);
    const newMaterial = new materialModel({nom: req.body.nom,
                                        user:req.body.user,
                              });
    newMaterial.save();
    res.json(newMaterial);
  })

.get((req, res, next) => {
    materialModel.find({}).populate('user').sort('date_ajout').then((materials) => {
    
          res.json(materials)
      });
})


materials.route('/:id')

.patch(async (req, res, next) => {
  const mat = await materialModel.findById(req.params.id);
  Object.assign(mat, req.body);
  await mat.save();
  res.statusCode=201;
  res.json(mat);
})

.delete(checkAuth,(req, res, next) => {
  materialModel.deleteOne({_id: req.params.id}).then(result => {
    if (result.n >0){
      res.status(200).json({ message: "Successfuly deleted!" });
    } else {
      res.status(401).json({ message: "Not Authorized!!!" })    }
  }) 
})



module.exports= materials ;
