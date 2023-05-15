const express = require("express");
const router = express.Router();
const producted = require("../middleware/protected");
const Orders = require("../schemas/orderShema");

router.get("/api/allorders", producted, async (req, res) => {
  await Orders.find()
    .then((allproducts) => {
      res.json(allproducts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/placeOrder", producted, async (req, res) => {
  const { order_items, total, userInfo, status } = req.body;

  const order = await new Orders({
    order_items,
    total,
    userInfo,
    status,
  });
  order
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/updateOrder/:id", producted, async (req, res) => {
  var update = await Orders.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(update);
});

router.delete("/api/delOrder/:id", producted, async (req, res) => {
  const delProduct = await Orders.findOneAndDelete(
    { _id: req.params.id },
    { $pull: req.body }
  );
  res.status(200).json(delProduct);
});

module.exports = router;
