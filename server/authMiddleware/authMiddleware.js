const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authMiddleware = async(req, res, next)=>{
  try{
    const token = req.cookies.token;
    if(!token){
        throw new Error();
    }

    const tokenInfo = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({token: token});

    req.user = user;

    next();

  }catch(error){
    return res.status(400).send("You are unauthorised");
  }
}

module.exports = authMiddleware;