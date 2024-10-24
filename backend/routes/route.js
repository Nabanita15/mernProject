const express = require("express");
const router = express.Router();
const userAPI = require("../controllers/userAPI");
const auth = require("../middleware/auth");
//...routes..
//..........register api.........
router.post("/register", userAPI.Register);

//........login api...............
router.post("/login", userAPI.login);
router.post("/refresh", userAPI.refreshtoken);

//.........logout..............
router.get("/logout", userAPI.logout);

//...getuser using middlewear...

router.get('/info',auth,userAPI.getuser)

module.exports = router;
