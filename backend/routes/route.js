const express = require("express");
const router = express.Router();
const userAPI = require("../controllers/userAPI");
//...routes..
//..........register api.........
router.post("/register", userAPI.Register);

//........login api...............
router.post("/login", userAPI.login);

module.exports = router;
