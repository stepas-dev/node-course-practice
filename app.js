const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  User.findById('5f03c7ec1ec5f304a394a572')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
    });
});
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(errorController.get404);
mongoose
  .connect(
    'mongodb+srv://stepas:gyglldc9vqc82of2@node-course-practice.zzq8u.mongodb.net/shop?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    return User.findOne();
  })
  .then(user => {
    if (!user) {
      const newUser = new User({
        name: 'Stepas',
        email: 'stepas@test.com',
        cart: { items: [] },
      });
      return newUser.save();
    }
    return Promise.resolve();
  })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
