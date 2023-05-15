const express = require("express");
const router = express.Router();
const producted = require("../middleware/protected");
const Carts = require("../schemas/cartSchema");

router.get("/api/allcarts", producted, async (req, res) => {
  await Carts.find()
    .then((allproducts) => {
      res.json(allproducts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/addcart", producted, async (req, res) => {
    const { material_type, cloth_type, price, product_image, status, qty ,_id} =
    req.body;

  var cartValid = await Carts.findOne({ product_image : product_image  });
  if (cartValid) {
    return res
      .status(400)
      .json({ error: "The product is already in your cart" });
  }

  const cart = await new Carts({
    material_type,
    cloth_type,
    product_image,
    price,
    status,
    qty: 1,
  });
  cart
    .save()
    .then((result) => {
      res.json({data:result, message:"Added to cart"});
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/updateCart/:id", producted, async (req, res) => {
  var update = await Carts.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(update);
});

router.delete("/api/delCart/:id", producted, async (req, res) => {
  const delProduct = await Carts.findOneAndDelete(
    { _id: req.params.id },
    { $pull: req.body }
  );
  res.status(200).json(delProduct);
});

module.exports = router;
