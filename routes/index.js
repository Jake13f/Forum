var express = require('express');
var knex = require('../utilities/knex.js');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   knex('test').select().then((results) => {
      res.render('index', {
         title: 'Express',
         results: results
      });
   });

});

module.exports = router;
