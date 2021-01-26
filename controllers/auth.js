const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  //   isLoggedIn = req.get('cookie').split(';')[0].trim().split('=')[1] === 'true';
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login page',
    isLoggedIn: false,
  });
};
exports.postLogin = (req, res, next) => {
  User.findById('5f03c7ec1ec5f304a394a572')
    .then(user => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      req.session.save(err => {
        console.log(err);
        res.redirect('/');
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};
