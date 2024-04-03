const Products = require("../models/product");

exports.getProducts = (req, res, next) => {
  Products.find()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Products.findById(productId)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
};

exports.getPagination = (req, res, next) => {
  const search = req.query.search;
  const category = req.query.category;

  if (category === "all") {
    return Products.find()
      .then((result) => {
        if (search !== "") {
          const searchProduct = result.filter((item) => {
            return item.name.includes(search);
          });
          return res.status(200).json(searchProduct);
        }
        return res.status(200).json(result);
      })
      .catch((err) => console.log(err));
  }

  Products.find({ category: category })
    .then((result) => {
      if (search !== "") {
        const searchProduct = result.filter((item) => {
          return item.name.includes(search);
        });

        return res.status(200).json(searchProduct);
      }

      return res.status(200).json(result);
    })
    .catch((err) => console.log(err));
};

exports.postNewProduct = (req, res, next) => {
  const img1 = req.file.path;
  const name = JSON.parse(req.body.productData).name;
  const category = JSON.parse(req.body.productData).category;
  const price = JSON.parse(req.body.productData).price;
  const long_desc = JSON.parse(req.body.productData).long_desc;
  const short_desc = JSON.parse(req.body.productData).short_desc;

  const product = new Products({
    name: name,
    category: category,
    price: price,
    long_desc: long_desc,
    short_desc: short_desc,
    img1: img1,
    img2: img1,
    img3: img1,
    img4: img1,
  });

  product.save();

  res.status(200).json({ message: "Create new Product Success!" });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const name = JSON.parse(req.body.productData).name;
  const category = JSON.parse(req.body.productData).category;
  const price = JSON.parse(req.body.productData).price;
  const long_desc = JSON.parse(req.body.productData).long_desc;
  const short_desc = JSON.parse(req.body.productData).short_desc;

  Products.findByIdAndUpdate(productId, {
    name: name,
    category: category,
    price: price,
    long_desc: long_desc,
    short_desc: short_desc,
  })
    .then((result) => {
      res.status(200).json({ message: "Update Product Success!" });
    })
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.query.productId;

  Products.findByIdAndDelete(productId)
    .then((result) => {
      res.status(200).json({ message: "Delete Product Success!" });
    })
    .catch((err) => console.log(err));
};
