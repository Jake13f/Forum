var express = require('express');
var knex = require('../utilities/knex');
var login = require('../utilities/login');

var router = express.Router();

/* GET home page. */
router.get('/', login.requireLogin, (req, res, next) => {
   knex('test').select().then((results) => {
      res.render('index', {
         title: 'Express',
         results: results
      });
   });
});

module.exports = router;
