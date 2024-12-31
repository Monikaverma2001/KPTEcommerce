const jwt = require("jsonwebtoken");
const user = require("../model/Users");
const admin=require("../model/AdminModel")

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
    //console.log("hnn1")
    const rootUser = await user.findOne({ _id: verifyToken._id, token: token });
    //console.log("hnn2")
    if (!rootUser) {
      res.status(401).json({ messege: "unauthorized" });
    }
    //console.log("hnn3")
    req.user = rootUser;
     //console.log(req.user)
    req.token = token;

    next();
  } catch (error) {
    //console.log(error)
    //console.log("hnn4")
    res.status(401).json({ messege: "unauthorized" });
  }
};

module.exports = authenticate;
