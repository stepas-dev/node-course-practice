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
  const product = new Product(title, imageUrl, price, description, null, req.user._id);
  product
    .save()
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
  Product.findById(productId)
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
  const product = new Product(title, imageUrl, price, description, productId);
  product
    .save()
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
  Product.fetchAll()
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
  Product.deleteById(productId)
    .then(result => {
      console.log('PRODUCT DELETED');
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
    });
};
