const mongoose = require("mongoose");
const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
    image: {
      type: Object,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
