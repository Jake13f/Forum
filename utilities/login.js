// Verify the user is logged in.  If not send them to the login screen
module.exports.requireLogin = (req, res, next) => {
	if (!req.user)
   	res.redirect('/login');
	else
		next();
}
