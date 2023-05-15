const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const Products = new mongoose.Schema(
  {
    material_type: {
      type: String,
      required: true,
    },
    cloth_type: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    product_image: {
      type: String,
    },
    status: {
      type: String,
    },
    ProfileBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Products", Products);
