var express = require('express');
var knex = require('../utilities/knex.js');

var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
   res.render('login');
});

// Query the database to verify proper user info
// @param username - the specified login name to check
// @param password - the password linked to the account
router.post('/validate', (req, res, next) => {

   knex('users').select().where({
      username: req.body.username
   }).then((user) => {
      if (user.length > 0) { // There is a user with the proper username in the database
			if (req.body.password === user[0].password) { // check if the passwords match
				req.session.user = user[0]; // sets a cookie with the user's info
				res.render('index', {});
			} else {
				res.render('login', {
					error: 'Invalid email or password.'
				});
			}
      } else {
			res.render('login', {
				error: 'Invalid email or password.'
			});
      }
   });
});

module.exports = router;
