const mongoDb = require('mongodb');
const { getDb } = require('../util/database');

class Product {
  constructor(title, imageUrl, price, description, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id && new mongoDb.ObjectId(id);
    this.userId = userId && new mongoDb.ObjectId(userId);
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db.collection('products').updateOne(
        { _id: this._id },
        {
          $set: this,
        }
      );
    } else {
      dbOp = db.collection('products').insertOne(this);
    }

    return dbOp
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection('products')
      .find()
      .toArray()
      .then(products => {
        return products;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection('products')
      .find({ _id: new mongoDb.ObjectId(id) })
      .next()
      .then(product => {
        console.log(product);
        return product;
      })
      .catch(err => {
        console.log(err);
      });
  }

  static deleteById(id) {
    const db = getDb();
    return db
      .collection('products')
      .deleteOne({
        _id: new mongoDb.ObjectId(id),
      })
      .then(() => {
        console.log('DELETED');
      })
      .catch(err => {
        console.log(err);
      });
  }
}

module.exports = Product;
