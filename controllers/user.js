const Users = require("../models/user");

exports.getCountUser = (req, res, next) => {
  Users.countDocuments()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.getAllUser = (req, res, next) => {
  Users.find()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
