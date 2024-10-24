const mongoose = require("mongoose");
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("category", categorySchema);
module.exports = categoryModel;
