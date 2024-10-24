const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
    try {  
    //   console.log("auth1");
    const token = req.header("Authorization");
    if (!token) return res.status(400).json({ msg: "invalid Authentication" });
    jwt.verify(token, process.env.SECRETE_KEY, (err, user) => {
      if (err) return res.status(400).json({ msg: "invalid Authentication" });
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
module.exports = auth;
