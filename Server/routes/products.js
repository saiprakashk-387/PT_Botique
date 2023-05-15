const express = require("express");
const router = express.Router();
const producted = require("../middleware/protected");
const Products = require("../schemas/productSchema");

router.get("/api/allproducts", producted, async (req, res) => {
  await Products.find()
    .then((allproducts) => {
      res.json(allproducts);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/createProduct", producted, async (req, res) => {
  const { material_type, cloth_type, price, product_image, status } = req.body;

  const product = await new Products({
    material_type,
    cloth_type,
    product_image,
    price,
    status,
  });
  product
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.put("/api/updateProduct/:id", producted, async (req, res) => {
  var update = await Products.findOneAndUpdate(
    { _id: req.params.id },
    { $set: req.body }
  );
  res.json(update);
});

router.delete("/api/delProduct/:id", producted, async (req, res) => {
  const delProduct = await Products.findOneAndDelete(
    { _id: req.params.id },
    { $pull: req.body }
  );
  res.status(200).json(delProduct);
});

module.exports = router;
