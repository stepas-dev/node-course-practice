const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;
const mongoConnect = callback => {
  MongoClient.connect(
    'mongodb+srv://stepas:gyglldc9vqc82of2@node-course-practice.zzq8u.mongodb.net/shop?retryWrites=true&w=majority',
    {
      useUnifiedTopology: true,
    }
  )
    .then(client => {
      console.log('CONNECTED!');
      // connects to shop because shop in connect string
      _db = client.db();
      callback();
    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};
const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No databse found!';
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
