var express = require('express');
var knex = require('../utilities/knex.js');
var login = require('../utilities/login');

var router = express.Router();

// Render the login page to the user
router.get('/', login.alreadyLoggedIn, (req, res, next) => {
   res.render('login');
});

// Query the database to verify proper user info
// @param username - the specified login name to check
// @param password - the password linked to the account
router.post('/validate', (req, res, next) => {
	var errors = [];

   knex('users').where({
      username: req.body.username
   }).first().then((user) => {
		if (user && (req.body.password === user.password)) { // check if the passwords match and the user exists
			req.session.user = user; // sets a cookie with the user's info
			res.send(errors);
		} else {
			errors.push("Invalid email or password.");
			res.send(errors);
		}
   });
});

module.exports = router;
