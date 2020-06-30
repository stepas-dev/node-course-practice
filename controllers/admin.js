const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product',
    path: '/admin/add-product',
    edit: false,
  });
};
exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  // Product.create({
  req.user
    .createProduct({
      description,
      price,
      imageUrl,
      title,
    })
    .then(() => {
      console.log('PRODUCT CREATED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getEditProduct = (req, res, next) => {
  const edit = req.query.edit === 'true';
  if (!edit) {
    return res.redirect('/');
  }
  const productId = req.params.productId;
  // req.user.getProducts({
  //   where: {
  //     id: productId,
  //   },
  // });
  Product.findByPk(productId)
    .then(product => {
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit product',
        path: '/admin/edit-product',
        edit,
        product,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res, next) => {
  const { productId, title, imageUrl, price, description } = req.body;
  Product.findByPk(productId)
    .then(product => {
      product.title = title;
      product.price = price;
      product.description = description;
      product.imageUrl = imageUrl;
      return product.save();
    })
    .then(() => {
      console.log('PRODUCT UPDATED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        products,
        pageTitle: 'Shop',
        path: '/admin/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(result => {
      console.log('PRODUCT DESTROYED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
