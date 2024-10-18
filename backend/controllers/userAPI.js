const user = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports = {
  Register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const finduser = await user.findOne({ email: email });
      if (finduser) {
        return res.status(401).json({ msg: "Email is already exist" });
      }
      if (password.length < 6) {
        return res
          .status(401)
          .json({ msg: "password should have more then 6 character" });
      }

      //.....password encryption.......
      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);
      //....create database for mango......
      const newUser = await user.create({
        name,
        email,
        password: bcryptPassword,
      });
      if (!newUser) {
        return res.status(401).json({ msg: "data is not register" });
      }

      //create jwt authentication...
      const accessToken = CreateAccessToken({ id: newUser._id });
      const refreshToken = createRefreshToken({ id: newUser._id });

      //return....
      res
        .status(201)
        .json({ msg: "data is successfully register", accessToken });
    } catch (error) {
      console.log("registered api is not working", error);
      return res.status(400).json({ msg: "registered api is not working" });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const finduser = await user.findOne({ email });
      if (!finduser) {
        return res.status(400).json({ msg: "invalid email" });
      }
      const comparePassword = bcrypt.compare(password, finduser.password);
      if (!comparePassword) {
        return res.status(400).json({ msg: "Password is not correct" });
      }
      return res.json({ msg: "Login is successful" });
    } catch (error) {
      console.log("login api is not working", error);
      return res.status(400).json({ msg: "login api is not working" });
    }
  },
};
const CreateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.SECRETE_KEY, {
    expiresIn: "1d",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_KEY, {
    expiresIn: "7d",
  });
};
