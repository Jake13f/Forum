var express = require('express');
var knex = require('../utilities/knex');
var login = require('../utilities/login');
var threads = require('../utilities/threads');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
   threads.getThreads((threads) => {
      res.render('dashboard', {
         threads: threads
      });
   });
});

module.exports = router;
