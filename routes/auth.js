const express = require("express");
const { check, body } = require("express-validator/check");

const authController = require("../controllers/auth");

const User = require("../models/user");

const router = express.Router();

router.post("/users/login", authController.postLogin);

router.post(
  "/users/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          console.log(userDoc);
          if (userDoc) {
            return Promise.reject("E-Mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
    check("fullName").trim().not().isEmpty(),
    check("phoneNumber").trim().not().isEmpty(),
    check("password").trim(),
  ],
  authController.postSignup
);

// router.post("/logout", authController.postLogout);

module.exports = router;
