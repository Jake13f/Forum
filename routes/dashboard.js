var express = require('express');
var knex = require('../utilities/knex');
var login = require('../utilities/login');

var router = express.Router();

/* GET home page. */
router.get('/', login.requireLogin, (req, res, next) => {
   res.render('dashboard', {
      username: req.session.user.username
   });
});

module.exports = router;
