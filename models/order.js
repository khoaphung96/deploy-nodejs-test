const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const orderchema = new Schema({
  user: {
    idUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      product: { type: Object, required: true },
      count: { type: Number, required: true },
    },
  ],
  total: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderchema);
