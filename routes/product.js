const express = require("express");

const productController = require("../controllers/product");

const router = express.Router();

//
router.get("/products", productController.getProducts);

//
router.get("/products/:productId", productController.getProduct);

//
router.post("/products/pagination", productController.getPagination);

//
router.post("/newProduct", productController.postNewProduct);

//
router.post("/editProduct", productController.postEditProduct);

//
router.post("/deleteProduct/", productController.postDeleteProduct);

module.exports = router;
