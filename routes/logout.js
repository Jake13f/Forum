var express = require('express');
var knex = require('../utilities/knex.js');
var login = require('../utilities/login');

var router = express.Router();

// Sign the user out.  The user must already be logged in.
router.get('/', login.requireLogin, (req, res, next) => {
	req.session.reset();
	res.redirect('/login')
});

module.exports = router;
