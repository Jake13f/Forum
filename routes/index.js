var express = require('express');
var knex = require('../utilities/knex');
var login = require('../utilities/login');

var router = express.Router();

/* GET home page. */
router.get('/', login.alreadyLoggedIn, (req, res, next) => {
   res.render('index');
});

module.exports = router;
