const categoryModel = require("../models/catetorymodel");

module.exports = {
  categoryGet: async (req, res) => {
    try {
      console.log("object");
      const category = await categoryModel.find();
      res.json(category);
    } catch (error) {
      console.error("my api is not working", error);
      res.status(500).json({ msg: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await categoryModel.findOne({ name });
      if (category) {
        res.status(400).json({ msg: "category is already exist" });
      }
      //create the category......
      const newCategory = await categoryModel.create({ name });
      if (!newCategory) {
        return res.status(400).json({ msg: "category is not created" });
      }

      res.json({ msg: "category is created", newCategory });

      //   res.json({ msg: "check admin is accessible" });
    } catch (error) {
      console.error("my api is not working", error);
      res.status(500).json({ msg: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const id = req.params.id;
      const deleteCategory = await categoryModel.findByIdAndDelete(id);

      if (!deleteCategory) {
        res.status(400).json({
          msg: "category is not deleted",
        });
      }
      res.status(201).json({ msg: "category is deleted  successful" });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const id = req.params.id;
      const findCategory = await categoryModel.findById(id);
      if (!findCategory) {
        res.status(400).json({
          msg: "invalid category",
        });
      }
      const newCategory = await categoryModel.findByIdAndUpdate(
        { _id: id },
        { name:name },
        { new: true }
      );
      if (!newCategory) {
        res.status(400).json({
          msg: "category is not update ",
        });
      }
      res
        .status(202)
        .json({ msg: "category is successfully updated", newCategory });
    } catch (error) {
      console.error("err", error);
      res.status(500).json({ msg: error.message });
    }
  },
};
