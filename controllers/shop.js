const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
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
  Product.findAll()
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
    .then(cart => {
      return cart.getProducts();
    })
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
  let fetchedCart;
  let newQuantity = 1;
  req.user
    .getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: productId } });
    })
    .then(products => {
      console.log(products);
      let product;
      if (products.length > 0) {
        product = products[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }

      return Product.findByPk(productId);

      // .then(product => {
      //   return fetchedCart.addProduct(product, {
      //     through: {
      //       quantity: newQuantity,
      //     },
      //   });
      // })
      // .catch(err => {
      //   console.log(err);
      // });
    })
    .then(product => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.postCartDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({
        where: {
          id: productId,
        },
      });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(() => {
      console.log('CART ITEM DESTROYED');
      res.redirect('/cart');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your orders',
  });
};
exports.postOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      return req.user
        .createOrder()
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = { quantity: product.cartItem.quantity };
              return product;
            })
          );
        })
        .catch(err => {
          console.log(err);
        });
      // return p
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      console.log(err);
    });
};
exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
