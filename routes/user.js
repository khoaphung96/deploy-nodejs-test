const express = require("express");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/users/count", userController.getCountUser);

router.get("/users", userController.getAllUser);

module.exports = router;
