const jwt = require("jsonwebtoken");
const userModel = require('../models/User');
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token)
    const decodedToken = jwt.verify(token, "secret_should_be_longuer");
    req.userData = {email: decodedToken.email , userId: decodedToken.userId};
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};
