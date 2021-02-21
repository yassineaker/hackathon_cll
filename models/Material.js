const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const materialSchema = mongoose.Schema({

    nom : {type:String, required:[true,"Le nom du materiel est obligatoire!"]},
    date_ajout:{type:Date,
    default:Date.now},
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}
})

materialSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Material", materialSchema);