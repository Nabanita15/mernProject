const express = require("express");
const router = express.Router();
const category = require("../controllers/categoryController");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/getcategory", category.categoryGet);
router.post("/createcategory", auth, authAdmin, category.createCategory);
router.delete("/deletecategory/:id", auth, authAdmin, category.deleteCategory);
router.put("/updatecategory/:id", auth, authAdmin, category.updateCategory);

module.exports = router;
