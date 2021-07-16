const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

// -- Routes
router.post("/newProduct", productController.newProduct);
router.get("/getProduct", productController.getProduct);
router.put("/updateProduct", productController.updateProduct);
router.delete("/deleteProductById", productController.deleteProductById);
router.get("/getProductById", productController.getProductById);

module.exports = router;