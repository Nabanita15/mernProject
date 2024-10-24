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

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
      });
      // console.log(req.cookies.refreshtoken);
      //return....
      res
        .status(201)
        .json({ msg: "data is successfully register", accessToken });
    } catch (error) {
      console.log("registered api is not working", error);
      return res.status(400).json({ msg: "registered api is not working" });
    }
  },
  refreshtoken: async (req, res) => {
    // console.log("hjkl;lkjhgc");
    //...store the token....
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        res.status(400).json({ msg: "please login or registers" });
      }

      jwt.verify(rf_token, process.env.REFRESH_KEY, (err, user) => {
        if (err) res.status(400).json({ msg: "please login and register" });
        const accessToken = createRefreshToken({ id: user.id });

        res.json({ user, accessToken });
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const finduser = await user.findOne({ email });
      if (!finduser) {
        return res.status(400).json({ msg: "invalid email" });
      }

      //compare the password
      const comparePassword = bcrypt.compare(password, finduser.password);
      if (!comparePassword) {
        return res.status(400).json({ msg: "Password is not correct" });
      }

      //create jwt token
      const accessToken = CreateAccessToken({ id: finduser.id });
      const refreshToken = createRefreshToken({ id: finduser.id });

      if (!accessToken) return res.status(400).json({ msg: "invalid token" });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
      });
      res.json({ msg: "Login is successful", accessToken });
    } catch (error) {
      console.log("login api is not working", error);
      return res.status(400).json({ msg: "login api is not working" });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken");
      return res.json({ msg: "this account is logout" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  getuser: async (req, res) => {
    try {
      // const { user } = req.body
      
      const finduser = await user.findById(req.user.id).select('-password');
      if(!finduser) return req.status(400).msg({msg:"user not found"})
      res.json(finduser);
    } catch (error) {}
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
