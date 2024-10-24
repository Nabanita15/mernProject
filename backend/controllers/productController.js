const productModel = require("../models/productModel");
module.exports = {
  getproduct: async (req, res) => {
    try {
      const getproduct = await productModel.find();
        if (!getproduct) {
          res.status(400).json({msg:"product is not found"})
      }
      res.status(200).json({msg:"data is present",getproduct});
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  newproduct: async (req, res) => {
      try {
        
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  deleteproduct: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateproduct: async (req, res) => {
    try {
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
};
