  
const mongoose = require('mongoose');
module.exports = mongoose.model('Transaction', new mongoose.Schema({
   destSrc: String , 
   montant: {
                type: Number,
                validate: {
                            validator: function(v) {
                                return v>0;
                            },
                message: props => `${props.value} montant doit etre > 0!`
                },
                required: [true, ' required']
            } , 
   date: Date , 
   type: String ,
   issuer: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true}
}));