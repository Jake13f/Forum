var knex = require('./knex');

// Verify the user is logged in.  If not send them to the login screen
module.exports.requireLogin = (req, res, next) => {
	if (!req.user)
   	res.redirect('/login');
	else
		next();
};

// Check to see if the user is already logged in.
module.exports.alreadyLoggedIn = (req, res, next) => {
	if (!req.user)
		next();
	else
		res.redirect('/');
}

// Query the database to see if the user is already signed in.
module.exports.checkLogin = (req, res, next) => {
	if (req.session && req.session.user) {
		knex('users').select().where({
			username: req.session.user.username
		}).then((user) => {
			if (user.length > 0) {
				req.user = user[0];
				delete req.user.password; // delete the password from the session
				req.session.user = user[0]; // refresh the session value
				res.locals.user = user[0];
			}
			// finishing processing the middleware and run the route
			next();
		});
	} else {
		next();
	}
};
