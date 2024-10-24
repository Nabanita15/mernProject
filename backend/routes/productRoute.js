const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

router.get("/getproduct", productController.getproduct);

router.post("/getproduct", productController.newproduct);

router.delete("/getproduct/:id", productController.deleteproduct);

router.put("/getproduct/:id", productController.updateproduct);

module.exports = router;
