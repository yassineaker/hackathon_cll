
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

/*const userSchema = mongoose.Schema({
     firstname: { type: String, required: [true, "Le nom est obligatoire!"] },
     lastname: { type: String, required: [true, "Le prenom est obligatoire!"] },
     email: { type: String, required: [true, "L'email est obligatoire!"] ,
          unique: [true, "L'email deja existe!!"],
          match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email',
          ]  },
     password: { type: String, required: [true, "Le mot de passe est obligatoire!"],minlength: 6,
     select: false },
     type: { type: String , enum: ['user', 'admin'],
          default: 'user', },
     phone: {type:String, required:false },
     classe : {type:String, required:[true, "Le classe est obligatoire!"]},
     createdAt: {
          type: Date,
          default: Date.now,
        },
});*/


const userSchema = mongoose.Schema({
     firstname: { type: String,  },
     lastname: { type: String,  },
     email: { type: String
           },
     password: { type: String,minlength: 6 },
     type: { type: String , enum: ['user', 'admin'],
          default: 'user', },
     phone: {type:String },
     classe : {type:String},
     createdAt: {
          type: Date,
          default: Date.now,
        },
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);