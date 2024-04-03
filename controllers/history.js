const Orders = require("../models/order");
const convertMoney = require("../util/convertMoney");

exports.getHistory = (req, res, next) => {
  const idUser = req.query.idUser;

  Orders.find()
    .then((orders) => {
      console.log(orders);
      const orderById = orders.filter((item) => {
        return item.user.idUser.toString() === idUser;
      });

      res.status(200).json(orderById);
    })
    .catch((err) => console.log(err));
};

exports.getDetailHistory = (req, res, next) => {
  const orderId = req.params.orderId;
  Orders.findById(orderId)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.getAllHistory = (req, res, next) => {
  Orders.find()
    .sort({ _id: -1 })
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
};

exports.getLatestOrder = (req, res, next) => {
  Orders.find()
    .limit(5)
    .sort({ _id: -1 })
    .then((results) => res.json(results))
    .catch((err) => console.log(err));
};

exports.getTotal = (req, res, next) => {
  let total = 0;

  Orders.find()
    .then((results) => {
      results.map((item) => {
        item.products.map((item) => {
          total = total + item.product.price * item.count;
          return total;
        });
      });

      res.json(convertMoney(total));
    })
    .catch((err) => console.log(err));
};

exports.getCountOrder = (req, res, next) => {
  Orders.countDocuments()
    .then((result) => res.json(result))
    .catch((err) => console.log(err));
};
