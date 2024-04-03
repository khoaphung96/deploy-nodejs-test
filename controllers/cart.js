const Cart = require("../models/cart");

exports.postAddToCart = (req, res, next) => {
  const userId = req.body.idUser;
  const productId = req.body.product.productId;
  const name = req.body.product.name;
  const img1 = req.body.product.img1;
  const price = req.body.product.price;
  const count = req.body.count;

  const cart = new Cart({
    idUser: userId,
    product: {
      productId: productId,
      name: name,
      img1: img1,
      price: price,
    },
    count: count,
  });

  Cart.find({ idUser: userId })
    .then((result) => {
      const checkProductOnCart = result.find((item) => {
        return item.product.productId.toString() === productId;
      });

      if (checkProductOnCart) {
        return Cart.findByIdAndUpdate(checkProductOnCart._id, {
          count: checkProductOnCart.count + count,
        })
          .then((result) => console.log(result))
          .catch((err) => console.log(err));
      }

      if (!checkProductOnCart) {
        return cart.save();
      }
    })
    .catch((err) => console.log(err));
};

exports.getCart = (req, res, next) => {
  const userId = req.query.idUser;

  Cart.find({ idUser: userId })
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};

exports.deleteOnCart = (req, res, next) => {
  const userId = req.query.idUser;
  const productId = req.query.idProduct;

  Cart.find({ idUser: userId })
    .then((result) => {
      const checkProductOnCart = result.find((item) => {
        return item.product.productId.toString() === productId;
      });

      return Cart.findByIdAndDelete(checkProductOnCart._id)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};

exports.updateCart = (req, res, next) => {
  const userId = req.query.idUser;
  const productId = req.query.idProduct;
  const count = req.query.count;

  Cart.find({ idUser: userId })
    .then((result) => {
      const checkProductOnCart = result.find((item) => {
        return item.product.productId.toString() === productId;
      });

      return Cart.findByIdAndUpdate(checkProductOnCart._id, {
        count: count,
      })
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
