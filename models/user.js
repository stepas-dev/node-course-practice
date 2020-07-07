const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

module.exports = mongoose.model('User', userSchema);

// const mongoDb = require('mongodb');
// const { getDb } = require('../util/database');
//
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email;
//     this.cart = cart;
//     this._id = id && new mongoDb.ObjectId(id);
//   }
//
//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this);
//   }
//
//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return String(cp.productId) === String(product._id);
//     });
//     let newQuantity = 1;
//     const updatedCartItems = [...this.cart.items];
//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1;
//       updatedCartItems[cartProductIndex].quantity = newQuantity;
//     } else {
//       updatedCartItems.push({ productId: product._id, quantity: newQuantity });
//     }
//     const updatedCart = { items: updatedCartItems };
//     const db = getDb();
//     return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
//   }
//
//   getCart() {
//     const productIds = this.cart.items.map(i => {
//       return i.productId;
//     });
//     const db = getDb();
//     let products;
//     return db
//       .collection('products')
//       .find({
//         _id: {
//           $in: productIds,
//         },
//       })
//       .toArray()
//       .then(products => {
//         return products.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => String(i.productId) === String(p._id)).quantity,
//           };
//         });
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
//
//   deleteCartItem(id) {
//     const updatedCartItems = this.cart.items.filter(i => i.productId.toString() !== id.toString());
//     const db = getDb();
//     return db
//       .collection('users')
//       .updateOne({ _id: this._id }, { $set: { cart: { items: updatedCartItems } } });
//   }
//
//   addOrder() {
//     const db = getDb();
//     return this.getCart()
//       .then(products => {
//         const order = {
//           items: products,
//           user: {
//             _id: this._id,
//             name: this.name,
//             email: this.email,
//           },
//         };
//         return db.collection('orders').insertOne(order);
//       })
//       .then(() => {
//         this.cart = { items: [] };
//         return db
//           .collection('users')
//           .updateOne({ _id: this._id }, { $set: { cart: { items: [] } } });
//       });
//   }
//
//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({ 'user._id': this._id }).toArray();
//   }
//
//   static findById(id) {
//     const db = getDb();
//     return db
//       .collection('users')
//       .findOne({ _id: new mongoDb.ObjectId(id) })
//       .then(user => {
//         return user;
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }
// }
//
// module.exports = User;
