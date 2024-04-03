const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const csSchema = new Schema({
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    // user, admin, cs
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Cs", csSchema);
