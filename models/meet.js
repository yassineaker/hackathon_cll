  
const mongoose = require('mongoose');
module.exports = mongoose.model('Meet', new mongoose.Schema({
   sujet: String ,
   dateDeb: Date , 
   dateFIn: Date, 
   membersList: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}] , 
   creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}
}));