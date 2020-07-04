const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/products', {
        products,
        pageTitle: 'All products',
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getProduct = (req, res, next) => {
  const productId = req.params.productId;
  Product.findById(productId)
    .then(product => {
      res.render('shop/product-detail', {
        pageTitle: product.title,
        product,
        path: '/products',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getIndex = (req, res, next) => {
  Product.fetchAll()
    .then(products => {
      res.render('shop/index', {
        products,
        pageTitle: 'Shop',
        path: '/',
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your cart',
        products,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .deleteCartItem(productId)
    .then(() => {
      console.log('CART ITEM DELETED');
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getOrders = (req, res, next) => {
  req.user
    .getOrders()
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your orders',
        orders,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postOrder = (req, res, next) => {
  req.user
    .addOrder()
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    });
};
