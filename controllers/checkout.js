const mongoose = require("mongoose");
const Cart = require("../models/cart");
const Order = require("../models/order");
const convertMoney = require("../util/convertMoney");

exports.postCheckout = (req, res, next) => {
  const idUser = req.query.idUser;
  const email = req.query.email;
  const fullName = req.query.fullname;
  const phoneNumber = req.query.phone;
  const address = req.query.address;

  Cart.find({ idUser: new mongoose.Types.ObjectId(idUser) })
    .then((result) => {
      let total = 0;

      result.map((item) => {
        return (total = total + item.product.price * item.count);
      });

      const order = new Order({
        user: {
          idUser: idUser,
          email: email,
          fullName: fullName,
          phoneNumber: phoneNumber,
          address: address,
        },
        products: result,
        total: convertMoney(total) + " VND",
        time: new Date().toLocaleString(),
        status: "Booked",
      });

      order.save();

      const cartIdByUserArr = result.map((item) => item._id);

      Promise.all(
        cartIdByUserArr.map((id) => {
          return Cart.findByIdAndDelete(id);
        })
      )
        .then()
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => console.log(err));
};

exports.postSendEmail = (req, res, next) => {
  const idUser = req.query.idUser;
  const email = req.query.email;
  const fullName = req.query.fullname;
  const phoneNumber = req.query.phone;
  const address = req.query.address;

  const postmark = require("postmark");
  const client = new postmark.Client("1898b3d8-a6a0-4ba6-8a94-b2f2389ad733");

  Cart.find({ idUser: new mongoose.Types.ObjectId(idUser) }).then((result) => {
    let total = 0;

    result.map((item) => {
      return (total = total + item.product.price * item.count);
    });

    const product = result.map((item) => {
      return {
        name: item.product.name,
        img1: item.product.img1,
        price: convertMoney(item.product.price) + " VND",
        count: item.count,
        total: convertMoney(item.product.price * item.count) + " VND",
      };
    });
    console.log(email);
    client.sendEmailWithTemplate({
      From: "khoappdfx20473@funix.edu.vn",
      To: email,
      TemplateId: "35422989",
      TemplateModel: {
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        product: product,
        total: convertMoney(total) + " VND",
      },
    });
  });
};
