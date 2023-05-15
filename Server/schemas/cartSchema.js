const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const cartSchema = new mongoose.Schema(
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
      type: Number,
      required: true,
    },
    product_image: {
      type: String,
    },
    status: {
      type: String,
    },
    qty: {
      type: Number,
    },
    ProfileBy: {
      type: ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carts", cartSchema);
