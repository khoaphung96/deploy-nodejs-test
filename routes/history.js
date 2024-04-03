const express = require("express");

const historyController = require("../controllers/history");

const router = express.Router();

router.get("/histories", historyController.getHistory);

router.get("/histories/:orderId", historyController.getDetailHistory);

router.get("/allHistories", historyController.getAllHistory);

router.get("/total", historyController.getTotal);

router.get("/countOrder", historyController.getCountOrder);

router.get("/latestOrder", historyController.getLatestOrder);

module.exports = router;
