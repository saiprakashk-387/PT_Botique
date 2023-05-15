const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const orderSchema = new mongoose.Schema(
  {
    order_items: [Object],
    total: {
      type: Number,
    },
    userInfo: [Object],
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

module.exports = mongoose.model("Orders", orderSchema);
