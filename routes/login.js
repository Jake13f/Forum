var express = require('express');
var knex = require('../utilities/knex.js');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
   res.render('login');
});

module.exports = router;
