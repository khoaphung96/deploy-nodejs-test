const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { validationResult } = require("express-validator/check");

const User = require("../models/user");

exports.postLogin = (req, res, next) => {
  const email = req.query.email;
  const password = req.query.password;

  let loadedUser;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("A user with this email could not be found.");
        error.statusCode = 401;
        throw error;
      }

      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("Wrong password!");
        error.statusCode = 404;
        throw error;
      }

      req.session.isLoggedIn = true;
      req.session.user = loadedUser;

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        "somesupersecretsecret",
        process.env.JWT_SECRET
      );

      res.status(200).json({
        message: "Authenticated!",
        accessToken: token,
        userId: loadedUser._id.toString(),
        roll: loadedUser.roll,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postSignup = (req, res, next) => {
  const email = req.query.email;
  const fullName = req.query.fullName;
  const phoneNumber = req.query.phoneNumber;
  const password = req.query.password;
  // const confirmPassword = req.body.confirmPassword;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;

    // return res.status(400).json({ message: errors.array().msg });
  }

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email: email,
        fullName: fullName,
        phoneNumber: phoneNumber,
        password: hashedPassword,
        // address: "none", //chua co
        roll: "user",
      });

      return user.save();
    })
    .then((result) => {
      res.status(201).json({ message: "User created!", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    res.redirect("/");
  });
};
