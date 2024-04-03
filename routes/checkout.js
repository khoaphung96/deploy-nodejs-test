const express = require("express");

const checkoutController = require("../controllers/checkout");

const router = express.Router();

router.post("/checkout", checkoutController.postCheckout);

router.post("/email", checkoutController.postSendEmail);

module.exports = router;
