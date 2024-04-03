const express = require("express");

const cartController = require("../controllers/cart");

const router = express.Router();

router.post("/carts/add", cartController.postAddToCart);

router.get("/carts", cartController.getCart);

router.delete("/carts/delete", cartController.deleteOnCart);

router.put("/carts/update", cartController.updateCart);

module.exports = router;
