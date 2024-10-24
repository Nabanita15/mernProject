const user = require("../models/userModel");

const authAdmin = (req, res, next) => {
  try {
    const finduser = user.findOne(req.user.id);
   
    
    if (!finduser) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (finduser.role === 0) {
      return res.status(400).json({ msg: "admin is resource denied access" });
    }
    req.user = finduser;
    next();
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = authAdmin;
