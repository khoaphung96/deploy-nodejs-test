const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  product: {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    img1: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  count: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
