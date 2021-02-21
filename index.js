const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User.js');
const checkAuth = require('./middleware/check-auth');
const path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express()
const port = 3300
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(cors());

/*app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json({extended:true}));*/
app.use(express.json());

app.use('/login', require('./routes/login.js'));
app.use('/register', require('./routes/register.js'));
app.use('/transactions', require('./routes/transactions.js'));
app.use('/meets', require('./routes/meets.js'));
app.use('/materialsmaterials', require('./routes/materials.js'));
// app.options('*',cors());
//







var connection = mongoose.connect('mongodb://localhost:27017/cll', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then((connection) => {
    UserModel.find({}).then((users) => {
        console.log(users);
    });
});


app.listen(port, () => {
  console.log(`Example app listening at  ${port}`)
})